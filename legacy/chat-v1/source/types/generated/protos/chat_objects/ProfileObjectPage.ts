// Original file: source/types/generated/protos/definitions/chat_objects.proto

import type { ProfileObject as _chat_objects_ProfileObject, ProfileObject__Output as _chat_objects_ProfileObject__Output } from './ProfileObject';
import type { PaginationResponse as _common_objects_PaginationResponse, PaginationResponse__Output as _common_objects_PaginationResponse__Output } from '../common_objects/PaginationResponse';

export interface ProfileObjectPage {
  'records'?: (_chat_objects_ProfileObject)[];
  'metadata'?: (_common_objects_PaginationResponse | null);
}

export interface ProfileObjectPage__Output {
  'records'?: (_chat_objects_ProfileObject__Output)[];
  'metadata'?: (_common_objects_PaginationResponse__Output);
}
