// Original file: source/types/generated/protos/definitions/ChatObjects.proto

import type { MessageObject as _ChatObjectsPackage_MessageObject, MessageObject__Output as _ChatObjectsPackage_MessageObject__Output } from '../ChatObjectsPackage/MessageObject';
import type { PaginationResponse as _CommonObjects_PaginationResponse, PaginationResponse__Output as _CommonObjects_PaginationResponse__Output } from '../CommonObjects/PaginationResponse';

export interface MessageObjectPage {
  'records'?: (_ChatObjectsPackage_MessageObject)[];
  'metadata'?: (_CommonObjects_PaginationResponse | null);
}

export interface MessageObjectPage__Output {
  'records'?: (_ChatObjectsPackage_MessageObject__Output)[];
  'metadata'?: (_CommonObjects_PaginationResponse__Output);
}
