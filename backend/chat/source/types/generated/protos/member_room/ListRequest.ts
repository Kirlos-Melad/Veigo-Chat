// Original file: source/types/generated/protos/definitions/member_room.proto

import type { PaginationResponse as _common_objects_PaginationResponse, PaginationResponse__Output as _common_objects_PaginationResponse__Output } from '../common_objects/PaginationResponse';

export interface ListRequest {
  'roomId'?: (string);
  'page'?: (_common_objects_PaginationResponse | null);
}

export interface ListRequest__Output {
  'roomId'?: (string);
  'page'?: (_common_objects_PaginationResponse__Output);
}
