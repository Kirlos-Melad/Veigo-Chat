// Original file: source/types/generated/protos/definitions/authentication/AuthenticationObjects.proto

import type { DeviceObject as _AuthenticationObjectsPackage_DeviceObject, DeviceObject__Output as _AuthenticationObjectsPackage_DeviceObject__Output } from '../AuthenticationObjectsPackage/DeviceObject';
import type { PaginationResponse as _CommonObjects_PaginationResponse, PaginationResponse__Output as _CommonObjects_PaginationResponse__Output } from '../CommonObjects/PaginationResponse';

export interface DeviceObjectPage {
  'records'?: (_AuthenticationObjectsPackage_DeviceObject)[];
  'metadata'?: (_CommonObjects_PaginationResponse | null);
}

export interface DeviceObjectPage__Output {
  'records'?: (_AuthenticationObjectsPackage_DeviceObject__Output)[];
  'metadata'?: (_CommonObjects_PaginationResponse__Output);
}
