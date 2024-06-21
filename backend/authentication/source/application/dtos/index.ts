import ChangePasswordDto, { ChangePassword } from "./ChangePassword.dto";
import DeleteAccountDto, { DeleteAccount } from "./DeleteAccount.dto";
import ForgetPasswordDto, { ForgetPassword } from "./ForgetPassword.dto";
import RefreshTokenDto, { RefreshTokenSerialized } from "./RefreshToken.dto";
import ResetPasswordDto, { ResetPassword } from "./ResetPassword.dto";
import SendEmailVerificationDto, {
	SendEmailVerification,
} from "./SendEmailVerification.dto";
import SignInDto, { SignInSerialized } from "./SignIn.dto";
import SignOutDto, { SignOut } from "./SignOut.dto";
import SignUpDto, { SignUpSerialized } from "./SignUp.dto";
import ValidateAccessTokenDto, {
	ValidateAccessTokenSerialized,
} from "./ValidateAccessToken.dto";
import ValidateOTPDto, { ValidateOTP } from "./ValidateOTP.dto";
import VerifyEmailDto, { VerifyEmail } from "./VerifyEmail.dto";

class AuthenticationDto {
	public static SignUp(data: any) {
		return new SignUpDto(data);
	}

	public static SignIn(data: any) {
		return new SignInDto(data);
	}

	public static ChangePassword(data: any) {
		return new ChangePasswordDto(data);
	}

	public static ForgetPassword(data: any) {
		return new ForgetPasswordDto(data);
	}

	public static ResetPassword(data: any) {
		return new ResetPasswordDto(data);
	}

	public static SendEmailVerification(data: any) {
		return new SendEmailVerificationDto(data);
	}

	public static VerifyEmail(data: any) {
		return new VerifyEmailDto(data);
	}

	public static ValidateAccessToken(data: any) {
		return new ValidateAccessTokenDto(data);
	}

	public static ValidateOTP(data: any) {
		return new ValidateOTPDto(data);
	}

	public static RefreshToken(data: any) {
		return new RefreshTokenDto(data);
	}

	public static SignOut(data: any) {
		return new SignOutDto(data);
	}

	public static DeleteAccount(data: any) {
		return new DeleteAccountDto(data);
	}
}

export default AuthenticationDto;
export type {
	SignUpSerialized,
	SignInSerialized,
	ChangePassword,
	ForgetPassword,
	ResetPassword,
	SendEmailVerification,
	VerifyEmail,
	ValidateAccessTokenSerialized,
	ValidateOTP,
	RefreshTokenSerialized,
	SignOut,
	DeleteAccount,
};
