// Original file: source/types/generated/protos/definitions/authentication.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AccountObject as _authentication_objects_AccountObject, AccountObject__Output as _authentication_objects_AccountObject__Output } from '../authentication_objects/AccountObject';
import type { AuthenticationResponse as _authentication_AuthenticationResponse, AuthenticationResponse__Output as _authentication_AuthenticationResponse__Output } from '../authentication/AuthenticationResponse';
import type { ChangePasswordRequest as _authentication_ChangePasswordRequest, ChangePasswordRequest__Output as _authentication_ChangePasswordRequest__Output } from '../authentication/ChangePasswordRequest';
import type { DeviceObjectPage as _authentication_objects_DeviceObjectPage, DeviceObjectPage__Output as _authentication_objects_DeviceObjectPage__Output } from '../authentication_objects/DeviceObjectPage';
import type { EmptyObject as _common_objects_EmptyObject, EmptyObject__Output as _common_objects_EmptyObject__Output } from '../common_objects/EmptyObject';
import type { ForgetPasswordRequest as _authentication_ForgetPasswordRequest, ForgetPasswordRequest__Output as _authentication_ForgetPasswordRequest__Output } from '../authentication/ForgetPasswordRequest';
import type { PaginationRequest as _common_objects_PaginationRequest, PaginationRequest__Output as _common_objects_PaginationRequest__Output } from '../common_objects/PaginationRequest';
import type { ResetPasswordRequest as _authentication_ResetPasswordRequest, ResetPasswordRequest__Output as _authentication_ResetPasswordRequest__Output } from '../authentication/ResetPasswordRequest';
import type { SendEmailVerificationRequest as _authentication_SendEmailVerificationRequest, SendEmailVerificationRequest__Output as _authentication_SendEmailVerificationRequest__Output } from '../authentication/SendEmailVerificationRequest';
import type { SignInRequest as _authentication_SignInRequest, SignInRequest__Output as _authentication_SignInRequest__Output } from '../authentication/SignInRequest';
import type { SignOutRequest as _authentication_SignOutRequest, SignOutRequest__Output as _authentication_SignOutRequest__Output } from '../authentication/SignOutRequest';
import type { SignUpRequest as _authentication_SignUpRequest, SignUpRequest__Output as _authentication_SignUpRequest__Output } from '../authentication/SignUpRequest';
import type { TokenObject as _authentication_objects_TokenObject, TokenObject__Output as _authentication_objects_TokenObject__Output } from '../authentication_objects/TokenObject';
import type { TokenRequest as _authentication_TokenRequest, TokenRequest__Output as _authentication_TokenRequest__Output } from '../authentication/TokenRequest';
import type { ValidateOTPRequest as _authentication_ValidateOTPRequest, ValidateOTPRequest__Output as _authentication_ValidateOTPRequest__Output } from '../authentication/ValidateOTPRequest';
import type { VerifyEmailRequest as _authentication_VerifyEmailRequest, VerifyEmailRequest__Output as _authentication_VerifyEmailRequest__Output } from '../authentication/VerifyEmailRequest';

export interface AuthenticationClient extends grpc.Client {
  ChangePassword(argument: _authentication_ChangePasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _authentication_ChangePasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _authentication_ChangePasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ChangePassword(argument: _authentication_ChangePasswordRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _authentication_ChangePasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _authentication_ChangePasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _authentication_ChangePasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  changePassword(argument: _authentication_ChangePasswordRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  DeleteAccount(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _common_objects_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  DeleteAccount(argument: _common_objects_EmptyObject, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _common_objects_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  deleteAccount(argument: _common_objects_EmptyObject, callback: grpc.requestCallback<_authentication_objects_AccountObject__Output>): grpc.ClientUnaryCall;
  
  ForgetPassword(argument: _authentication_ForgetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ForgetPassword(argument: _authentication_ForgetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ForgetPassword(argument: _authentication_ForgetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ForgetPassword(argument: _authentication_ForgetPasswordRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _authentication_ForgetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _authentication_ForgetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _authentication_ForgetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  forgetPassword(argument: _authentication_ForgetPasswordRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  ListDevices(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  ListDevices(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  ListDevices(argument: _common_objects_PaginationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  ListDevices(argument: _common_objects_PaginationRequest, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _common_objects_PaginationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  listDevices(argument: _common_objects_PaginationRequest, callback: grpc.requestCallback<_authentication_objects_DeviceObjectPage__Output>): grpc.ClientUnaryCall;
  
  RefreshToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _authentication_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  RefreshToken(argument: _authentication_TokenRequest, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authentication_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  refreshToken(argument: _authentication_TokenRequest, callback: grpc.requestCallback<_authentication_objects_TokenObject__Output>): grpc.ClientUnaryCall;
  
  ResetPassword(argument: _authentication_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _authentication_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _authentication_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ResetPassword(argument: _authentication_ResetPasswordRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _authentication_ResetPasswordRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _authentication_ResetPasswordRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _authentication_ResetPasswordRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  resetPassword(argument: _authentication_ResetPasswordRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  SendEmailVerification(argument: _authentication_SendEmailVerificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  SendEmailVerification(argument: _authentication_SendEmailVerificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  SendEmailVerification(argument: _authentication_SendEmailVerificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  SendEmailVerification(argument: _authentication_SendEmailVerificationRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _authentication_SendEmailVerificationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _authentication_SendEmailVerificationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _authentication_SendEmailVerificationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  sendEmailVerification(argument: _authentication_SendEmailVerificationRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  SignIn(argument: _authentication_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _authentication_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _authentication_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignIn(argument: _authentication_SignInRequest, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authentication_SignInRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authentication_SignInRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authentication_SignInRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signIn(argument: _authentication_SignInRequest, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  
  SignOut(argument: _authentication_SignOutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  SignOut(argument: _authentication_SignOutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  SignOut(argument: _authentication_SignOutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  SignOut(argument: _authentication_SignOutRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _authentication_SignOutRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _authentication_SignOutRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _authentication_SignOutRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  signOut(argument: _authentication_SignOutRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  SignUp(argument: _authentication_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _authentication_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _authentication_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  SignUp(argument: _authentication_SignUpRequest, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _authentication_SignUpRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _authentication_SignUpRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _authentication_SignUpRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  signUp(argument: _authentication_SignUpRequest, callback: grpc.requestCallback<_authentication_AuthenticationResponse__Output>): grpc.ClientUnaryCall;
  
  ValidateAccessToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateAccessToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateAccessToken(argument: _authentication_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateAccessToken(argument: _authentication_TokenRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _authentication_TokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _authentication_TokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateAccessToken(argument: _authentication_TokenRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  ValidateOTP(argument: _authentication_ValidateOTPRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _authentication_ValidateOTPRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _authentication_ValidateOTPRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  ValidateOTP(argument: _authentication_ValidateOTPRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _authentication_ValidateOTPRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _authentication_ValidateOTPRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _authentication_ValidateOTPRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  validateOtp(argument: _authentication_ValidateOTPRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
  VerifyEmail(argument: _authentication_VerifyEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _authentication_VerifyEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _authentication_VerifyEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  VerifyEmail(argument: _authentication_VerifyEmailRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _authentication_VerifyEmailRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _authentication_VerifyEmailRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _authentication_VerifyEmailRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  verifyEmail(argument: _authentication_VerifyEmailRequest, callback: grpc.requestCallback<_common_objects_EmptyObject__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthenticationHandlers extends grpc.UntypedServiceImplementation {
  ChangePassword: grpc.handleUnaryCall<_authentication_ChangePasswordRequest__Output, _common_objects_EmptyObject>;
  
  DeleteAccount: grpc.handleUnaryCall<_common_objects_EmptyObject__Output, _authentication_objects_AccountObject>;
  
  ForgetPassword: grpc.handleUnaryCall<_authentication_ForgetPasswordRequest__Output, _common_objects_EmptyObject>;
  
  ListDevices: grpc.handleUnaryCall<_common_objects_PaginationRequest__Output, _authentication_objects_DeviceObjectPage>;
  
  RefreshToken: grpc.handleUnaryCall<_authentication_TokenRequest__Output, _authentication_objects_TokenObject>;
  
  ResetPassword: grpc.handleUnaryCall<_authentication_ResetPasswordRequest__Output, _common_objects_EmptyObject>;
  
  SendEmailVerification: grpc.handleUnaryCall<_authentication_SendEmailVerificationRequest__Output, _common_objects_EmptyObject>;
  
  SignIn: grpc.handleUnaryCall<_authentication_SignInRequest__Output, _authentication_AuthenticationResponse>;
  
  SignOut: grpc.handleUnaryCall<_authentication_SignOutRequest__Output, _common_objects_EmptyObject>;
  
  SignUp: grpc.handleUnaryCall<_authentication_SignUpRequest__Output, _authentication_AuthenticationResponse>;
  
  ValidateAccessToken: grpc.handleUnaryCall<_authentication_TokenRequest__Output, _common_objects_EmptyObject>;
  
  ValidateOTP: grpc.handleUnaryCall<_authentication_ValidateOTPRequest__Output, _common_objects_EmptyObject>;
  
  VerifyEmail: grpc.handleUnaryCall<_authentication_VerifyEmailRequest__Output, _common_objects_EmptyObject>;
  
}

export interface AuthenticationDefinition extends grpc.ServiceDefinition {
  ChangePassword: MethodDefinition<_authentication_ChangePasswordRequest, _common_objects_EmptyObject, _authentication_ChangePasswordRequest__Output, _common_objects_EmptyObject__Output>
  DeleteAccount: MethodDefinition<_common_objects_EmptyObject, _authentication_objects_AccountObject, _common_objects_EmptyObject__Output, _authentication_objects_AccountObject__Output>
  ForgetPassword: MethodDefinition<_authentication_ForgetPasswordRequest, _common_objects_EmptyObject, _authentication_ForgetPasswordRequest__Output, _common_objects_EmptyObject__Output>
  ListDevices: MethodDefinition<_common_objects_PaginationRequest, _authentication_objects_DeviceObjectPage, _common_objects_PaginationRequest__Output, _authentication_objects_DeviceObjectPage__Output>
  RefreshToken: MethodDefinition<_authentication_TokenRequest, _authentication_objects_TokenObject, _authentication_TokenRequest__Output, _authentication_objects_TokenObject__Output>
  ResetPassword: MethodDefinition<_authentication_ResetPasswordRequest, _common_objects_EmptyObject, _authentication_ResetPasswordRequest__Output, _common_objects_EmptyObject__Output>
  SendEmailVerification: MethodDefinition<_authentication_SendEmailVerificationRequest, _common_objects_EmptyObject, _authentication_SendEmailVerificationRequest__Output, _common_objects_EmptyObject__Output>
  SignIn: MethodDefinition<_authentication_SignInRequest, _authentication_AuthenticationResponse, _authentication_SignInRequest__Output, _authentication_AuthenticationResponse__Output>
  SignOut: MethodDefinition<_authentication_SignOutRequest, _common_objects_EmptyObject, _authentication_SignOutRequest__Output, _common_objects_EmptyObject__Output>
  SignUp: MethodDefinition<_authentication_SignUpRequest, _authentication_AuthenticationResponse, _authentication_SignUpRequest__Output, _authentication_AuthenticationResponse__Output>
  ValidateAccessToken: MethodDefinition<_authentication_TokenRequest, _common_objects_EmptyObject, _authentication_TokenRequest__Output, _common_objects_EmptyObject__Output>
  ValidateOTP: MethodDefinition<_authentication_ValidateOTPRequest, _common_objects_EmptyObject, _authentication_ValidateOTPRequest__Output, _common_objects_EmptyObject__Output>
  VerifyEmail: MethodDefinition<_authentication_VerifyEmailRequest, _common_objects_EmptyObject, _authentication_VerifyEmailRequest__Output, _common_objects_EmptyObject__Output>
}
