// Original file: source/types/generated/protos/definitions/chat_objects.proto

import type { MessageObject as _chat_objects_MessageObject, MessageObject__Output as _chat_objects_MessageObject__Output } from '../chat_objects/MessageObject';
import type { PaginationResponse as _common_objects_PaginationResponse, PaginationResponse__Output as _common_objects_PaginationResponse__Output } from '../common_objects/PaginationResponse';

export interface MessageObjectPage {
  'records'?: (_chat_objects_MessageObject)[];
  'metadata'?: (_common_objects_PaginationResponse | null);
}

export interface MessageObjectPage__Output {
  'records'?: (_chat_objects_MessageObject__Output)[];
  'metadata'?: (_common_objects_PaginationResponse__Output);
}
