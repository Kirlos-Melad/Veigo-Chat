// Original file: source/types/generated/protos/definitions/Room.proto

import type { RoomObject as _ChatObjectsPackage_RoomObject, RoomObject__Output as _ChatObjectsPackage_RoomObject__Output } from '../ChatObjectsPackage/RoomObject';
import type { MemberRoomObject as _ChatObjectsPackage_MemberRoomObject, MemberRoomObject__Output as _ChatObjectsPackage_MemberRoomObject__Output } from '../ChatObjectsPackage/MemberRoomObject';

export interface CreateResponse {
  'information'?: (_ChatObjectsPackage_RoomObject | null);
  'members'?: (_ChatObjectsPackage_MemberRoomObject)[];
}

export interface CreateResponse__Output {
  'information'?: (_ChatObjectsPackage_RoomObject__Output);
  'members'?: (_ChatObjectsPackage_MemberRoomObject__Output)[];
}
