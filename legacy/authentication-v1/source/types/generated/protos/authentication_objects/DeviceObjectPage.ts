// Original file: source/types/generated/protos/definitions/authentication_objects.proto

import type { DeviceObject as _authentication_objects_DeviceObject, DeviceObject__Output as _authentication_objects_DeviceObject__Output } from '../authentication_objects/DeviceObject';
import type { PaginationResponse as _common_objects_PaginationResponse, PaginationResponse__Output as _common_objects_PaginationResponse__Output } from '../common_objects/PaginationResponse';

export interface DeviceObjectPage {
  'records'?: (_authentication_objects_DeviceObject)[];
  'metadata'?: (_common_objects_PaginationResponse | null);
}

export interface DeviceObjectPage__Output {
  'records'?: (_authentication_objects_DeviceObject__Output)[];
  'metadata'?: (_common_objects_PaginationResponse__Output);
}
