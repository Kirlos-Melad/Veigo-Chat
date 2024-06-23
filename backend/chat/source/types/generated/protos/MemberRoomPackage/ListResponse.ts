// Original file: source/types/generated/protos/definitions/MemberRoom.proto

import type { ProfileObject as _ChatObjectsPackage_ProfileObject, ProfileObject__Output as _ChatObjectsPackage_ProfileObject__Output } from '../ChatObjectsPackage/ProfileObject';
import type { PaginationResponse as _CommonObjects_PaginationResponse, PaginationResponse__Output as _CommonObjects_PaginationResponse__Output } from '../CommonObjects/PaginationResponse';

export interface ListResponse {
  'records'?: (_ChatObjectsPackage_ProfileObject)[];
  'metadata'?: (_CommonObjects_PaginationResponse | null);
}

export interface ListResponse__Output {
  'records'?: (_ChatObjectsPackage_ProfileObject__Output)[];
  'metadata'?: (_CommonObjects_PaginationResponse__Output);
}
