// Original file: source/types/generated/protos/definitions/Authentication.proto

import type { AccountObject as _AuthenticationObjectsPackage_AccountObject, AccountObject__Output as _AuthenticationObjectsPackage_AccountObject__Output } from '../AuthenticationObjectsPackage/AccountObject';
import type { TokenObject as _AuthenticationObjectsPackage_TokenObject, TokenObject__Output as _AuthenticationObjectsPackage_TokenObject__Output } from '../AuthenticationObjectsPackage/TokenObject';

export interface AuthenticationResponse {
  'account'?: (_AuthenticationObjectsPackage_AccountObject | null);
  'token'?: (_AuthenticationObjectsPackage_TokenObject | null);
}

export interface AuthenticationResponse__Output {
  'account'?: (_AuthenticationObjectsPackage_AccountObject__Output);
  'token'?: (_AuthenticationObjectsPackage_TokenObject__Output);
}
