import { AuthenticationHandlers } from "@root/source/types/generated/protos/AuthenticationPackage/Authentication";
import TransactionalCall from "../utilities/TransactionalCall";
import SignUpUseCase from "@root/source/domain/use-cases/SignUp.usecase";
import ValidateAccessTokenUseCase from "@root/source/domain/use-cases/ValidateAccessToken.usecase";
import SignInUseCase from "@root/source/domain/use-cases/SignIn.usecase";
import RefreshTokenUseCase from "@root/source/domain/use-cases/RefreshToken.usecase";

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
		() => ({} as any),
		async () => false,
		async () => null,
	);

	ChangePassword = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);
	ForgetPassword = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);
	ResetPassword = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);

	SendEmailVerification = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);
	VerifyEmail = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);

	ValidateAccessToken = TransactionalCall(
		ValidateAccessTokenUseCase.Serializer,
		ValidateAccessTokenUseCase.Authorize,
		ValidateAccessTokenUseCase.Handler,
	);

	ValidateOTP = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);

	RefreshToken = TransactionalCall(
		RefreshTokenUseCase.Serializer,
		RefreshTokenUseCase.Authorize,
		RefreshTokenUseCase.Handle,
	);

	SignOut = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);
	DeleteAccount = TransactionalCall<any, any, any>(
		() => ({} as any),
		async () => false,
		async () => null,
	);
}

export default AuthenticationService;
