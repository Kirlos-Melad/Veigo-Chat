import ChangePasswordDto, {
    ChangePasswordSerialized,
} from "@source/application/dtos/ChangePassword.dto";
import DeleteAccountDto, {
    DeleteAccountSerialized,
} from "@source/application/dtos/DeleteAccount.dto";
import ForgetPasswordDto, {
    ForgetPassword,
} from "@source/application/dtos/ForgetPassword.dto";
import RefreshTokenDto, {
    RefreshTokenSerialized,
} from "@source/application/dtos/RefreshToken.dto";
import ResetPasswordDto, {
    ResetPassword,
} from "@source/application/dtos/ResetPassword.dto";
import SendEmailVerificationDto, {
    SendEmailVerification,
} from "@source/application/dtos/SendEmailVerification.dto";
import SignInDto, {
    SignInSerialized,
} from "@source/application/dtos/SignIn.dto";
import SignOutDto, {
    SignOutSerialized,
} from "@source/application/dtos/SignOut.dto";
import SignUpDto, {
    SignUpSerialized,
} from "@source/application/dtos/SignUp.dto";
import ValidateAccessTokenDto, {
    ValidateAccessTokenSerialized,
} from "@source/application/dtos/ValidateAccessToken.dto";
import ValidateOTPDto, {
    ValidateOTP,
} from "@source/application/dtos/ValidateOTP.dto";
import VerifyEmailDto, {
    VerifyEmail,
} from "@source/application/dtos/VerifyEmail.dto";
import ListDevicesDto, { ListDevicesSerialized } from "./ListDevices.dto";

class AuthenticationDto {
    public static SignUp(data: any) {
        return new SignUpDto(data);
    }

    public static SignIn(data: any) {
        return new SignInDto(data);
    }

    public static ListDevices(data: any) {
        return new ListDevicesDto(data);
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
    ListDevicesSerialized,
    ChangePasswordSerialized,
    ForgetPassword,
    ResetPassword,
    SendEmailVerification,
    VerifyEmail,
    ValidateAccessTokenSerialized,
    ValidateOTP,
    RefreshTokenSerialized,
    SignOutSerialized,
    DeleteAccountSerialized,
};
