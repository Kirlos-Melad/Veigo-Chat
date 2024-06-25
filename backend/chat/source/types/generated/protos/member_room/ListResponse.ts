// Original file: source/types/generated/protos/definitions/member_room.proto

import type { ProfileObject as _chat_objects_ProfileObject, ProfileObject__Output as _chat_objects_ProfileObject__Output } from '../chat_objects/ProfileObject';
import type { PaginationResponse as _common_objects_PaginationResponse, PaginationResponse__Output as _common_objects_PaginationResponse__Output } from '../common_objects/PaginationResponse';

export interface ListResponse {
  'records'?: (_chat_objects_ProfileObject)[];
  'metadata'?: (_common_objects_PaginationResponse | null);
}

export interface ListResponse__Output {
  'records'?: (_chat_objects_ProfileObject__Output)[];
  'metadata'?: (_common_objects_PaginationResponse__Output);
}
