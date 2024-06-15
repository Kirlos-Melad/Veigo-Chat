// Original file: source/types/generated/protos/chat/definitions/Room.proto

import type { RoomObject as _ChatObjectsPackage_RoomObject, RoomObject__Output as _ChatObjectsPackage_RoomObject__Output } from '../ChatObjectsPackage/RoomObject';
import type { ProfileObject as _ChatObjectsPackage_ProfileObject, ProfileObject__Output as _ChatObjectsPackage_ProfileObject__Output } from '../ChatObjectsPackage/ProfileObject';

export interface RoomInformation {
  'information'?: (_ChatObjectsPackage_RoomObject | null);
  'members'?: (_ChatObjectsPackage_ProfileObject)[];
}

export interface RoomInformation__Output {
  'information'?: (_ChatObjectsPackage_RoomObject__Output);
  'members'?: (_ChatObjectsPackage_ProfileObject__Output)[];
}
