import { expect } from "chai";
import { createSandbox, SinonSpy, SinonStubbedInstance } from "sinon";
import grpc from "@grpc/grpc-js";

import TransactionalCall, {
    AuthorizationFunction,
    HandlerFunction,
    SerializerFunction,
} from "@source/application/utilities/TransactionalCall";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { DatabaseHooks } from "@tests/hooks/Database.hooks";
import { ServerUnaryCallImpl } from "@grpc/grpc-js/build/src/server-call";
import { GRPCFactory } from "@tests/factories/GRPC.factory";
import { Dto } from "@source/application/dtos/Dto";

describe("Transactional Call", () => {
    const sinon = createSandbox();

    let connection: DatabaseClient;

    let request: SinonStubbedInstance<grpc.ServerUnaryCall<any, any>>;
    let respond: SinonSpy<
        Parameters<grpc.sendUnaryData<any>>,
        ReturnType<grpc.sendUnaryData<any>>
    >;

    let AuthorizationFn: SinonSpy<
        Parameters<AuthorizationFunction<any>>,
        ReturnType<AuthorizationFunction<any>>
    >;
    let SerializerFn: SinonSpy<
        Parameters<SerializerFunction<any, any>>,
        ReturnType<SerializerFunction<any, any>>
    >;
    let HandlerFn: SinonSpy<
        Parameters<HandlerFunction<any, any>>,
        ReturnType<HandlerFunction<any, any>>
    >;

    before(async () => {
        connection = await DatabaseHooks.BeforeAll();

        request = sinon.createStubInstance(ServerUnaryCallImpl);
        request.request = {};
        respond = sinon.spy(GRPCFactory.Respond);

        AuthorizationFn = sinon.spy(GRPCFactory.Authorization());

        SerializerFn = sinon.spy(GRPCFactory.Serializer());

        HandlerFn = sinon.spy(GRPCFactory.Handler());
    });

    after(async () => {
        sinon.restore();
        await DatabaseHooks.AfterAll(connection);
    });

    it("Should Commit and respond with data", async () => {
        const call = TransactionalCall(
            SerializerFn,
            AuthorizationFn,
            HandlerFn,
        );
        await call(request, respond);

        expect(SerializerFn.calledOnceWith(request.request)).to.be.true;
        const serializer = SerializerFn.returnValues[0];
        expect(serializer).to.be.instanceOf(Dto);

        serializer.Serialize();
        expect(
            AuthorizationFn.calledOnceWith(request.metadata, serializer.data),
        ).to.be.true;
        expect(AuthorizationFn.calledAfter(SerializerFn)).to.be.true;

        const isAuthorized = await AuthorizationFn.returnValues[0];
        expect(isAuthorized).to.be.equal(true);

        expect(
            HandlerFn.calledOnceWith(sinon.match.any, {
                ...serializer.data,
                requesterId: undefined,
            }),
        ).to.be.true;
        expect(HandlerFn.calledAfter(AuthorizationFn)).to.be.true;
        const data = await HandlerFn.returnValues[0];
        expect(data).to.be.equal("data");

        expect(respond.calledOnceWith(null, data)).to.be.true;
        expect(respond.calledAfter(HandlerFn)).to.be.true;
    });

    xit("Should Rollback and respond with error", async () => {});
});
