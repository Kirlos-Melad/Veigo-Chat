// Original file: source/types/generated/protos/definitions/room.proto

import type { RoomObject as _chat_objects_RoomObject, RoomObject__Output as _chat_objects_RoomObject__Output } from '../chat_objects/RoomObject';
import type { MemberRoomObject as _chat_objects_MemberRoomObject, MemberRoomObject__Output as _chat_objects_MemberRoomObject__Output } from '../chat_objects/MemberRoomObject';

export interface CreateResponse {
  'information'?: (_chat_objects_RoomObject | null);
  'members'?: (_chat_objects_MemberRoomObject)[];
}

export interface CreateResponse__Output {
  'information'?: (_chat_objects_RoomObject__Output);
  'members'?: (_chat_objects_MemberRoomObject__Output)[];
}
