/* eslint-disable @typescript-eslint/naming-convention */
import grpc from "@grpc/grpc-js";

import { AuthenticationHandlers } from "@source/types/generated/protos/authentication/Authentication";
import { SignUpUseCase } from "@source/domain/use-cases/SignUp.usecase";
import { ValidateAccessTokenUseCase } from "@source/domain/use-cases/ValidateAccessToken.usecase";
import { SignInUseCase } from "@source/domain/use-cases/SignIn.usecase";
import { RefreshTokenUseCase } from "@source/domain/use-cases/RefreshToken.usecase";
import { ListDevicesUseCase } from "@source/domain/use-cases/ListDevices.usecase";
import { ChangePasswordUseCase } from "@source/domain/use-cases/ChangePassword.usecase";
import { SignOutUseCase } from "@source/domain/use-cases/SignOut.usecase";
import {
    ChangePasswordDto,
    ListDevicesDto,
    RefreshTokenDto,
    SignInDto,
    SignOutDto,
    SignUpDto,
    ValidateAccessTokenDto,
} from "../dtos";
import { IAccountRepository } from "@source/domain/repositories/IAccount.repository";
import { AccountRepository } from "@source/infrastructure/database/repositories/Account.repository";
import { DeviceRepository } from "@source/infrastructure/database/repositories/Device.repository";
import { IDeviceRepository } from "@source/domain/repositories/IDevice.repository";
import { transactionalCall } from "../utilities/TransactionalCall";

const accountRepository: IAccountRepository = new AccountRepository();
const deviceRepository: IDeviceRepository = new DeviceRepository();

class AuthenticationService implements AuthenticationHandlers {
    [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
    public SignUp = transactionalCall(
        new SignUpUseCase(new SignUpDto(), {
            account: accountRepository,
            device: deviceRepository,
        }),
    );

    public SignIn = transactionalCall(
        new SignInUseCase(new SignInDto(), {
            account: accountRepository,
            device: deviceRepository,
        }),
    );

    public ListDevices = transactionalCall(
        new ListDevicesUseCase(new ListDevicesDto(), deviceRepository),
    );

    public ChangePassword = transactionalCall(
        new ChangePasswordUseCase(new ChangePasswordDto(), accountRepository),
    );

    public ForgetPassword = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({ name: "ServerError", message: "Not implemented yet!" });
    };

    public ResetPassword = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({ name: "ServerError", message: "Not implemented yet!" });
    };

    public SendEmailVerification = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({ name: "ServerError", message: "Not implemented yet!" });
    };

    public VerifyEmail = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({ name: "ServerError", message: "Not implemented yet!" });
    };

    public ValidateAccessToken = transactionalCall(
        new ValidateAccessTokenUseCase(
            new ValidateAccessTokenDto(),
            deviceRepository,
        ),
    );

    public ValidateOTP = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({ name: "ServerError", message: "Not implemented yet!" });
    };

    public RefreshToken = transactionalCall(
        new RefreshTokenUseCase(new RefreshTokenDto(), deviceRepository),
    );

    public SignOut = transactionalCall(
        new SignOutUseCase(new SignOutDto(), deviceRepository),
    );

    public DeleteAccount = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: grpc.ServerUnaryCall<any, any>,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        respond: grpc.sendUnaryData<any>,
    ): void => {
        respond({ name: "ServerError", message: "Not implemented yet!" });
    };
}

export { AuthenticationService };
