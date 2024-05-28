// Original file: source/types/generated/protos/definitions/Authentication.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AccountObject as _AuthenticationPackage_AccountObject, AccountObject__Output as _AuthenticationPackage_AccountObject__Output } from '../AuthenticationPackage/AccountObject';
import type { AuthenticationResponse as _AuthenticationPackage_AuthenticationResponse, AuthenticationResponse__Output as _AuthenticationPackage_AuthenticationResponse__Output } from '../AuthenticationPackage/AuthenticationResponse';
import type { ChangePasswordRequest as _AuthenticationPackage_ChangePasswordRequest, ChangePasswordRequest__Output as _AuthenticationPackage_ChangePasswordRequest__Output } from '../AuthenticationPackage/ChangePasswordRequest';
import type { DeleteRequest as _AuthenticationPackage_DeleteRequest, DeleteRequest__Output as _AuthenticationPackage_DeleteRequest__Output } from '../AuthenticationPackage/DeleteRequest';
import type { DevicesListObject as _AuthenticationPackage_DevicesListObject, DevicesListObject__Output as _AuthenticationPackage_DevicesListObject__Output } from '../AuthenticationPackage/DevicesListObject';
import type { EmptyObject as _AuthenticationPackage_EmptyObject, EmptyObject__Output as _AuthenticationPackage_EmptyObject__Output } from '../AuthenticationPackage/EmptyObject';
import type { ForgetPasswordRequest as _AuthenticationPackage_ForgetPasswordRequest, ForgetPasswordRequest__Output as _AuthenticationPackage_ForgetPasswordRequest__Output } from '../AuthenticationPackage/ForgetPasswordRequest';
import type { ResetPasswordRequest as _AuthenticationPackage_ResetPasswordRequest, ResetPasswordRequest__Output as _AuthenticationPackage_ResetPasswordRequest__Output } from '../AuthenticationPackage/ResetPasswordRequest';
import type { SendEmailVerificationRequest as _AuthenticationPackage_SendEmailVerificationRequest, SendEmailVerificationRequest__Output as _AuthenticationPackage_SendEmailVerificationRequest__Output } from '../AuthenticationPackage/SendEmailVerificationRequest';
import type { SignInRequest as _AuthenticationPackage_SignInRequest, SignInRequest__Output as _AuthenticationPackage_SignInRequest__Output } from '../AuthenticationPackage/SignInRequest';
import type { SignOutRequest as _AuthenticationPackage_SignOutRequest, SignOutRequest__Output as _AuthenticationPackage_SignOutRequest__Output } from '../AuthenticationPackage/SignOutRequest';
import type { SignUpRequest as _AuthenticationPackage_SignUpRequest, SignUpRequest__Output as _AuthenticationPackage_SignUpRequest__Output } from '../AuthenticationPackage/SignUpRequest';
import type { TokenObject as _AuthenticationPackage_TokenObject, TokenObject__Output as _AuthenticationPackage_TokenObject__Output } from '../AuthenticationPackage/TokenObject';
import type { TokenRequest as _AuthenticationPackage_TokenRequest, TokenRequest__Output as _AuthenticationPackage_TokenRequest__Output } from '../AuthenticationPackage/TokenRequest';
import type { ValidateOTPRequest as _AuthenticationPackage_ValidateOTPRequest, ValidateOTPRequest__Output as _AuthenticationPackage_ValidateOTPRequest__Output } from '../AuthenticationPackage/ValidateOTPRequest';
import type { VerifyEmailRequest as _AuthenticationPackage_VerifyEmailRequest, VerifyEmailRequest__Output as _AuthenticationPackage_VerifyEmailRequest__Output } from '../AuthenticationPackage/VerifyEmailRequest';

export interface AuthenticationClient extends grpc.Client {
  ChangePassword(argument: _AuthenticationPackage_ChangePasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _AuthenticationPackage_ChangePasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _AuthenticationPackage_ChangePasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _AuthenticationPackage_ChangePasswordRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _AuthenticationPackage_ChangePasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _AuthenticationPackage_ChangePasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _AuthenticationPackage_ChangePasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _AuthenticationPackage_ChangePasswordRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  DeleteAccount(argument: _AuthenticationPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _AuthenticationPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _AuthenticationPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _AuthenticationPackage_DeleteRequest, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _AuthenticationPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _AuthenticationPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _AuthenticationPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _AuthenticationPackage_DeleteRequest, callback: grpc.requestCallback<_AuthenticationPackage_AccountObject__Output>): grpc.ClientUnaryCall;
  
  ForgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ForgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ForgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ForgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _AuthenticationPackage_ForgetPasswordRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  ListDevices(argument: _AuthenticationPackage_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  ListDevices(argument: _AuthenticationPackage_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  ListDevices(argument: _AuthenticationPackage_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  ListDevices(argument: _AuthenticationPackage_EmptyObject, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _AuthenticationPackage_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _AuthenticationPackage_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _AuthenticationPackage_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _AuthenticationPackage_EmptyObject, callback: grpc.requestCallback<_AuthenticationPackage_DevicesListObject__Output>): grpc.ClientUnaryCall;
  
  RefreshToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _AuthenticationPackage_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _AuthenticationPackage_TokenRequest, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _AuthenticationPackage_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _AuthenticationPackage_TokenRequest, callback: grpc.requestCallback<_AuthenticationPackage_TokenObject__Output>): grpc.ClientUnaryCall;
  
  ResetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _AuthenticationPackage_ResetPasswordRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  SendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  SendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  SendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  SendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _AuthenticationPackage_SendEmailVerificationRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  SignIn(argument: _AuthenticationPackage_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _AuthenticationPackage_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _AuthenticationPackage_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _AuthenticationPackage_SignInRequest, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _AuthenticationPackage_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _AuthenticationPackage_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _AuthenticationPackage_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _AuthenticationPackage_SignInRequest, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  
  SignOut(argument: _AuthenticationPackage_SignOutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  SignOut(argument: _AuthenticationPackage_SignOutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  SignOut(argument: _AuthenticationPackage_SignOutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  SignOut(argument: _AuthenticationPackage_SignOutRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _AuthenticationPackage_SignOutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _AuthenticationPackage_SignOutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _AuthenticationPackage_SignOutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _AuthenticationPackage_SignOutRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  SignUp(argument: _AuthenticationPackage_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _AuthenticationPackage_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _AuthenticationPackage_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _AuthenticationPackage_SignUpRequest, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _AuthenticationPackage_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _AuthenticationPackage_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _AuthenticationPackage_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _AuthenticationPackage_SignUpRequest, callback: grpc.requestCallback<_AuthenticationPackage_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateAccessToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateAccessToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateAccessToken(argument: _AuthenticationPackage_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateAccessToken(argument: _AuthenticationPackage_TokenRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _AuthenticationPackage_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _AuthenticationPackage_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _AuthenticationPackage_TokenRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  ValidateOTP(argument: _AuthenticationPackage_ValidateOTPRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _AuthenticationPackage_ValidateOTPRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _AuthenticationPackage_ValidateOTPRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _AuthenticationPackage_ValidateOTPRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _AuthenticationPackage_ValidateOTPRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _AuthenticationPackage_ValidateOTPRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _AuthenticationPackage_ValidateOTPRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _AuthenticationPackage_ValidateOTPRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  VerifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _AuthenticationPackage_VerifyEmailRequest, callback: grpc.requestCallback<_AuthenticationPackage_EmptyObject__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthenticationHandlers extends grpc.UntypedServiceImplementation {
  ChangePassword: grpc.handleUnaryCall<_AuthenticationPackage_ChangePasswordRequest__Output, _AuthenticationPackage_EmptyObject>;
  
  DeleteAccount: grpc.handleUnaryCall<_AuthenticationPackage_DeleteRequest__Output, _AuthenticationPackage_AccountObject>;
  
  ForgetPassword: grpc.handleUnaryCall<_AuthenticationPackage_ForgetPasswordRequest__Output, _AuthenticationPackage_EmptyObject>;
  
  ListDevices: grpc.handleUnaryCall<_AuthenticationPackage_EmptyObject__Output, _AuthenticationPackage_DevicesListObject>;
  
  RefreshToken: grpc.handleUnaryCall<_AuthenticationPackage_TokenRequest__Output, _AuthenticationPackage_TokenObject>;
  
  ResetPassword: grpc.handleUnaryCall<_AuthenticationPackage_ResetPasswordRequest__Output, _AuthenticationPackage_EmptyObject>;
  
  SendEmailVerification: grpc.handleUnaryCall<_AuthenticationPackage_SendEmailVerificationRequest__Output, _AuthenticationPackage_EmptyObject>;
  
  SignIn: grpc.handleUnaryCall<_AuthenticationPackage_SignInRequest__Output, _AuthenticationPackage_AuthenticationResponse>;
  
  SignOut: grpc.handleUnaryCall<_AuthenticationPackage_SignOutRequest__Output, _AuthenticationPackage_EmptyObject>;
  
  SignUp: grpc.handleUnaryCall<_AuthenticationPackage_SignUpRequest__Output, _AuthenticationPackage_AuthenticationResponse>;
  
  ValidateAccessToken: grpc.handleUnaryCall<_AuthenticationPackage_TokenRequest__Output, _AuthenticationPackage_EmptyObject>;
  
  ValidateOTP: grpc.handleUnaryCall<_AuthenticationPackage_ValidateOTPRequest__Output, _AuthenticationPackage_EmptyObject>;
  
  VerifyEmail: grpc.handleUnaryCall<_AuthenticationPackage_VerifyEmailRequest__Output, _AuthenticationPackage_EmptyObject>;
  
}

export interface AuthenticationDefinition extends grpc.ServiceDefinition {
  ChangePassword: MethodDefinition<_AuthenticationPackage_ChangePasswordRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_ChangePasswordRequest__Output, _AuthenticationPackage_EmptyObject__Output>
  DeleteAccount: MethodDefinition<_AuthenticationPackage_DeleteRequest, _AuthenticationPackage_AccountObject, _AuthenticationPackage_DeleteRequest__Output, _AuthenticationPackage_AccountObject__Output>
  ForgetPassword: MethodDefinition<_AuthenticationPackage_ForgetPasswordRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_ForgetPasswordRequest__Output, _AuthenticationPackage_EmptyObject__Output>
  ListDevices: MethodDefinition<_AuthenticationPackage_EmptyObject, _AuthenticationPackage_DevicesListObject, _AuthenticationPackage_EmptyObject__Output, _AuthenticationPackage_DevicesListObject__Output>
  RefreshToken: MethodDefinition<_AuthenticationPackage_TokenRequest, _AuthenticationPackage_TokenObject, _AuthenticationPackage_TokenRequest__Output, _AuthenticationPackage_TokenObject__Output>
  ResetPassword: MethodDefinition<_AuthenticationPackage_ResetPasswordRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_ResetPasswordRequest__Output, _AuthenticationPackage_EmptyObject__Output>
  SendEmailVerification: MethodDefinition<_AuthenticationPackage_SendEmailVerificationRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_SendEmailVerificationRequest__Output, _AuthenticationPackage_EmptyObject__Output>
  SignIn: MethodDefinition<_AuthenticationPackage_SignInRequest, _AuthenticationPackage_AuthenticationResponse, _AuthenticationPackage_SignInRequest__Output, _AuthenticationPackage_AuthenticationResponse__Output>
  SignOut: MethodDefinition<_AuthenticationPackage_SignOutRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_SignOutRequest__Output, _AuthenticationPackage_EmptyObject__Output>
  SignUp: MethodDefinition<_AuthenticationPackage_SignUpRequest, _AuthenticationPackage_AuthenticationResponse, _AuthenticationPackage_SignUpRequest__Output, _AuthenticationPackage_AuthenticationResponse__Output>
  ValidateAccessToken: MethodDefinition<_AuthenticationPackage_TokenRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_TokenRequest__Output, _AuthenticationPackage_EmptyObject__Output>
  ValidateOTP: MethodDefinition<_AuthenticationPackage_ValidateOTPRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_ValidateOTPRequest__Output, _AuthenticationPackage_EmptyObject__Output>
  VerifyEmail: MethodDefinition<_AuthenticationPackage_VerifyEmailRequest, _AuthenticationPackage_EmptyObject, _AuthenticationPackage_VerifyEmailRequest__Output, _AuthenticationPackage_EmptyObject__Output>
}
