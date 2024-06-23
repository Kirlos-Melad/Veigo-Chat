// Original file: source/types/generated/protos/definitions/ChatObjects.proto

import type { RoomObject as _ChatObjectsPackage_RoomObject, RoomObject__Output as _ChatObjectsPackage_RoomObject__Output } from '../ChatObjectsPackage/RoomObject';
import type { PaginationResponse as _CommonObjects_PaginationResponse, PaginationResponse__Output as _CommonObjects_PaginationResponse__Output } from '../CommonObjects/PaginationResponse';

export interface RoomObjectPage {
  'records'?: (_ChatObjectsPackage_RoomObject)[];
  'metadata'?: (_CommonObjects_PaginationResponse | null);
}

export interface RoomObjectPage__Output {
  'records'?: (_ChatObjectsPackage_RoomObject__Output)[];
  'metadata'?: (_CommonObjects_PaginationResponse__Output);
}
