import { AuthenticationHandlers } from "@source/types/generated/protos/authentication/Authentication";
import TransactionalCall from "@source/application/utilities/TransactionalCall";
import SignUpUseCase from "@source/domain/use-cases/SignUp.usecase";
import ValidateAccessTokenUseCase from "@source/domain/use-cases/ValidateAccessToken.usecase";
import SignInUseCase from "@source/domain/use-cases/SignIn.usecase";
import RefreshTokenUseCase from "@source/domain/use-cases/RefreshToken.usecase";
import { ListDevicesUseCase } from "@source/domain/use-cases/ListDevices.usecase";
import { ChangePasswordUseCase } from "@source/domain/use-cases/ChangePassword.usecase";
import { SignOutUseCase } from "@source/domain/use-cases/SignOut.usecase";

class AuthenticationService implements AuthenticationHandlers {
    [name: string]: import("@grpc/grpc-js").UntypedHandleCall;
    SignUp = TransactionalCall(
        SignUpUseCase.Serializer,
        SignUpUseCase.Authorize,
        SignUpUseCase.Handler,
    );

    SignIn = TransactionalCall(
        SignInUseCase.Serializer,
        SignInUseCase.Authorize,
        SignInUseCase.Handler,
    );

    ListDevices = TransactionalCall<any, any, any>(
        ListDevicesUseCase.Serializer,
        ListDevicesUseCase.Authorize,
        ListDevicesUseCase.Handler,
    );

    ChangePassword = TransactionalCall<any, any, any>(
        ChangePasswordUseCase.Serializer,
        ChangePasswordUseCase.Authorize,
        ChangePasswordUseCase.Handler,
    );

    ForgetPassword = TransactionalCall<any, any, any>(
        () => ({}) as any,
        async () => false,
        async () => null,
    );

    ResetPassword = TransactionalCall<any, any, any>(
        () => ({}) as any,
        async () => false,
        async () => null,
    );

    SendEmailVerification = TransactionalCall<any, any, any>(
        () => ({}) as any,
        async () => false,
        async () => null,
    );

    VerifyEmail = TransactionalCall<any, any, any>(
        () => ({}) as any,
        async () => false,
        async () => null,
    );

    ValidateAccessToken = TransactionalCall(
        ValidateAccessTokenUseCase.Serializer,
        ValidateAccessTokenUseCase.Authorize,
        ValidateAccessTokenUseCase.Handler,
    );

    ValidateOTP = TransactionalCall<any, any, any>(
        () => ({}) as any,
        async () => false,
        async () => null,
    );

    RefreshToken = TransactionalCall(
        RefreshTokenUseCase.Serializer,
        RefreshTokenUseCase.Authorize,
        RefreshTokenUseCase.Handle,
    );

    SignOut = TransactionalCall<any, any, any>(
        SignOutUseCase.Serializer,
        SignOutUseCase.Authorize,
        SignOutUseCase.Handler,
    );

    DeleteAccount = TransactionalCall<any, any, any>(
        () => ({}) as any,
        async () => false,
        async () => null,
    );
}

export default new AuthenticationService();
