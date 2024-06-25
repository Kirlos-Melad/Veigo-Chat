// Original file: source/types/generated/protos/definitions/authentication.proto

import type { AccountObject as _authentication_objects_AccountObject, AccountObject__Output as _authentication_objects_AccountObject__Output } from '../authentication_objects/AccountObject';
import type { TokenObject as _authentication_objects_TokenObject, TokenObject__Output as _authentication_objects_TokenObject__Output } from '../authentication_objects/TokenObject';

export interface AuthenticationResponse {
  'account'?: (_authentication_objects_AccountObject | null);
  'token'?: (_authentication_objects_TokenObject | null);
}

export interface AuthenticationResponse__Output {
  'account'?: (_authentication_objects_AccountObject__Output);
  'token'?: (_authentication_objects_TokenObject__Output);
}
