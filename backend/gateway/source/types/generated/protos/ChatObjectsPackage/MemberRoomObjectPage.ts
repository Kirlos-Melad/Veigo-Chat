// Original file: source/types/generated/protos/definitions/ChatObjects.proto

import type { MemberRoomObject as _ChatObjectsPackage_MemberRoomObject, MemberRoomObject__Output as _ChatObjectsPackage_MemberRoomObject__Output } from '../ChatObjectsPackage/MemberRoomObject';
import type { PaginationResponse as _CommonObjects_PaginationResponse, PaginationResponse__Output as _CommonObjects_PaginationResponse__Output } from '../CommonObjects/PaginationResponse';

export interface MemberRoomObjectPage {
  'records'?: (_ChatObjectsPackage_MemberRoomObject)[];
  'metadata'?: (_CommonObjects_PaginationResponse | null);
}

export interface MemberRoomObjectPage__Output {
  'records'?: (_ChatObjectsPackage_MemberRoomObject__Output)[];
  'metadata'?: (_CommonObjects_PaginationResponse__Output);
}
