// Original file: source/types/generated/protos/definitions/Message.proto

import type { PaginationRequest as _CommonObjects_PaginationRequest, PaginationRequest__Output as _CommonObjects_PaginationRequest__Output } from '../CommonObjects/PaginationRequest';

export interface ListRequest {
  'roomId'?: (string);
  'page'?: (_CommonObjects_PaginationRequest | null);
}

export interface ListRequest__Output {
  'roomId'?: (string);
  'page'?: (_CommonObjects_PaginationRequest__Output);
}
