// Original file: source/types/generated/protos/authentication/definitions/Authentication.proto

import type { AccountObject as _AuthenticationPackage_AccountObject, AccountObject__Output as _AuthenticationPackage_AccountObject__Output } from '../AuthenticationPackage/AccountObject';
import type { TokenObject as _AuthenticationPackage_TokenObject, TokenObject__Output as _AuthenticationPackage_TokenObject__Output } from '../AuthenticationPackage/TokenObject';

export interface AuthenticationResponse {
  'account'?: (_AuthenticationPackage_AccountObject | null);
  'token'?: (_AuthenticationPackage_TokenObject | null);
}

export interface AuthenticationResponse__Output {
  'account'?: (_AuthenticationPackage_AccountObject__Output);
  'token'?: (_AuthenticationPackage_TokenObject__Output);
}
