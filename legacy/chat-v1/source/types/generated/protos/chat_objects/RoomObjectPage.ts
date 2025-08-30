// Original file: source/types/generated/protos/definitions/chat_objects.proto

import type { RoomObject as _chat_objects_RoomObject, RoomObject__Output as _chat_objects_RoomObject__Output } from './RoomObject';
import type { PaginationResponse as _common_objects_PaginationResponse, PaginationResponse__Output as _common_objects_PaginationResponse__Output } from '../common_objects/PaginationResponse';

export interface RoomObjectPage {
  'records'?: (_chat_objects_RoomObject)[];
  'metadata'?: (_common_objects_PaginationResponse | null);
}

export interface RoomObjectPage__Output {
  'records'?: (_chat_objects_RoomObject__Output)[];
  'metadata'?: (_common_objects_PaginationResponse__Output);
}
