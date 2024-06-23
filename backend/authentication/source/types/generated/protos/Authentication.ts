import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthenticationClient as _AuthenticationPackage_AuthenticationClient, AuthenticationDefinition as _AuthenticationPackage_AuthenticationDefinition } from './AuthenticationPackage/Authentication';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  AuthenticationObjectsPackage: {
    AccountObject: MessageTypeDefinition
    DeviceObject: MessageTypeDefinition
    DeviceObjectPage: MessageTypeDefinition
    TokenObject: MessageTypeDefinition
  }
  AuthenticationPackage: {
    Authentication: SubtypeConstructor<typeof grpc.Client, _AuthenticationPackage_AuthenticationClient> & { service: _AuthenticationPackage_AuthenticationDefinition }
    AuthenticationResponse: MessageTypeDefinition
    ChangePasswordRequest: MessageTypeDefinition
    DeleteAccountRequest: MessageTypeDefinition
    ForgetPasswordRequest: MessageTypeDefinition
    ResetPasswordRequest: MessageTypeDefinition
    SendEmailVerificationRequest: MessageTypeDefinition
    SignInRequest: MessageTypeDefinition
    SignOutRequest: MessageTypeDefinition
    SignUpRequest: MessageTypeDefinition
    TokenRequest: MessageTypeDefinition
    ValidateOTPRequest: MessageTypeDefinition
    VerifyEmailRequest: MessageTypeDefinition
  }
  CommonObjects: {
    EmptyObject: MessageTypeDefinition
    PaginationRequest: MessageTypeDefinition
    PaginationResponse: MessageTypeDefinition
  }
}

