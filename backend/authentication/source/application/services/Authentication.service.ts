import { AuthenticationHandlers } from "@root/source/types/generated/protos/AuthenticationPackage/Authentication";
import TransactionalCall from "../utilities/TransactionalCall";
import SignUpUseCase from "@root/source/domain/use-cases/SignUp.usecase";
import ValidateAccessTokenUseCase from "@root/source/domain/use-cases/ValidateAccessToken.usecase";
import RefreshTokenUseCase from "@root/source/domain/use-cases/RefreshToken.usecase";
import SignInUseCase from "@root/source/domain/use-cases/SignIn.usecase";

class AuthenticationService implements AuthenticationHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;
	SignUp = TransactionalCall(SignUpUseCase);
	SignIn = TransactionalCall(SignInUseCase);

	ListDevices = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});

	ChangePassword = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});
	ForgetPassword = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});
	ResetPassword = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});

	SendEmailVerification = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});
	VerifyEmail = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});

	ValidateAccessToken = TransactionalCall(ValidateAccessTokenUseCase);

	ValidateOTP = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});

	RefreshToken = TransactionalCall(RefreshTokenUseCase);

	SignOut = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});
	DeleteAccount = TransactionalCall<any, any>(() => {
		return { error: "NotImplemented", result: null } as any;
	});
}

export default AuthenticationService;
