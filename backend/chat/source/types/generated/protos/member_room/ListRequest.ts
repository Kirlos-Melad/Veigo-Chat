// Original file: source/types/generated/protos/definitions/member_room.proto

import type { PaginationRequest as _common_objects_PaginationRequest, PaginationRequest__Output as _common_objects_PaginationRequest__Output } from '../common_objects/PaginationRequest';

export interface ListRequest {
  'roomId'?: (string);
  'page'?: (_common_objects_PaginationRequest | null);
}

export interface ListRequest__Output {
  'roomId'?: (string);
  'page'?: (_common_objects_PaginationRequest__Output);
}
