import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthenticationClient as _authentication_AuthenticationClient, AuthenticationDefinition as _authentication_AuthenticationDefinition } from './authentication/Authentication';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  authentication: {
    Authentication: SubtypeConstructor<typeof grpc.Client, _authentication_AuthenticationClient> & { service: _authentication_AuthenticationDefinition }
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
  authentication_objects: {
    AccountObject: MessageTypeDefinition
    DeviceObject: MessageTypeDefinition
    DeviceObjectPage: MessageTypeDefinition
    TokenObject: MessageTypeDefinition
  }
  common_objects: {
    EmptyObject: MessageTypeDefinition
    PaginationRequest: MessageTypeDefinition
    PaginationResponse: MessageTypeDefinition
  }
}

