// Original file: source/types/generated/protos/definitions/chat_objects.proto

import type { MemberRoomObject as _chat_objects_MemberRoomObject, MemberRoomObject__Output as _chat_objects_MemberRoomObject__Output } from '../chat_objects/MemberRoomObject';
import type { PaginationResponse as _common_objects_PaginationResponse, PaginationResponse__Output as _common_objects_PaginationResponse__Output } from '../common_objects/PaginationResponse';

export interface MemberRoomObjectPage {
  'records'?: (_chat_objects_MemberRoomObject)[];
  'metadata'?: (_common_objects_PaginationResponse | null);
}

export interface MemberRoomObjectPage__Output {
  'records'?: (_chat_objects_MemberRoomObject__Output)[];
  'metadata'?: (_common_objects_PaginationResponse__Output);
}
