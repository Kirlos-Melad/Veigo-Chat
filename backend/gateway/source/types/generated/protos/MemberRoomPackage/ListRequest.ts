// Original file: source/types/generated/protos/definitions/MemberRoom.proto

import type { PaginationResponse as _CommonObjects_PaginationResponse, PaginationResponse__Output as _CommonObjects_PaginationResponse__Output } from '../CommonObjects/PaginationResponse';

export interface ListRequest {
  'roomId'?: (string);
  'page'?: (_CommonObjects_PaginationResponse | null);
}

export interface ListRequest__Output {
  'roomId'?: (string);
  'page'?: (_CommonObjects_PaginationResponse__Output);
}
