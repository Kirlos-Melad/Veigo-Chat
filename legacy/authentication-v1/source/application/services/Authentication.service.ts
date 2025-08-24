import grpc from "@grpc/grpc-js";

import { AuthenticationHandlers } from "@source/types/generated/protos/authentication/Authentication";
import { SignUpUseCase } from "@source/domain/use-cases/SignUp.usecase";
import { ValidateAccessTokenUseCase } from "@source/domain/use-cases/ValidateAccessToken.usecase";
import { SignInUseCase } from "@source/domain/use-cases/SignIn.usecase";
import { RefreshTokenUseCase } from "@source/domain/use-cases/RefreshToken.usecase";
import { ListDevicesUseCase } from "@source/domain/use-cases/ListDevices.usecase";
import { ChangePasswordUseCase } from "@source/domain/use-cases/ChangePassword.usecase";
import { SignOutUseCase } from "@source/domain/use-cases/SignOut.usecase";
import { IAccountRepository } from "@source/domain/repositories/IAccount.repository";
import { AccountRepository } from "@source/infrastructure/database/repositories/Account.repository";
import { DeviceRepository } from "@source/infrastructure/database/repositories/Device.repository";
import { IDeviceRepository } from "@source/domain/repositories/IDevice.repository";
import { useCaseToGrpcHandler } from "../utilities/UseCaseToGrpcHandler";
import { IsolationLevel } from "@source/infrastructure/database/DatabaseManager";

const accountRepository: IAccountRepository = new AccountRepository();
const deviceRepository: IDeviceRepository = new DeviceRepository();

class AuthenticationService implements AuthenticationHandlers {
    [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
    public SignUp = useCaseToGrpcHandler(
        new SignUpUseCase({
            account: accountRepository,
            device: deviceRepository,
        }),
        IsolationLevel.Serializable,
    );

    public SignIn = useCaseToGrpcHandler(
        new SignInUseCase({
            account: accountRepository,
            device: deviceRepository,
        }),
        IsolationLevel.Serializable,
    );

    public ListDevices = useCaseToGrpcHandler(
        new ListDevicesUseCase(deviceRepository),
        IsolationLevel.Serializable,
    );

    public ChangePassword = useCaseToGrpcHandler(
        new ChangePasswordUseCase(accountRepository),
        IsolationLevel.Serializable,
    );

    public ForgetPassword = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({
            name: "ServerError",
            message: "Not implemented yet!",
            code: grpc.status.UNIMPLEMENTED,
        });
    };

    public ResetPassword = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({
            name: "ServerError",
            message: "Not implemented yet!",
            code: grpc.status.UNIMPLEMENTED,
        });
    };

    public SendEmailVerification = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({
            name: "ServerError",
            message: "Not implemented yet!",
            code: grpc.status.UNIMPLEMENTED,
        });
    };

    public VerifyEmail = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({
            name: "ServerError",
            message: "Not implemented yet!",
            code: grpc.status.UNIMPLEMENTED,
        });
    };

    public ValidateAccessToken = useCaseToGrpcHandler(
        new ValidateAccessTokenUseCase(deviceRepository),
        IsolationLevel.Serializable,
    );

    public ValidateOTP = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({
            name: "ServerError",
            message: "Not implemented yet!",
            code: grpc.status.UNIMPLEMENTED,
        });
    };

    public RefreshToken = useCaseToGrpcHandler(
        new RefreshTokenUseCase(deviceRepository),
        IsolationLevel.Serializable,
    );

    public SignOut = useCaseToGrpcHandler(
        new SignOutUseCase(deviceRepository),
        IsolationLevel.Serializable,
    );

    public DeleteAccount = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({
            name: "ServerError",
            message: "Not implemented yet!",
            code: grpc.status.UNIMPLEMENTED,
        });
    };
}

export { AuthenticationService };
