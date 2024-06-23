import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MessageClient as _MessagePackage_MessageClient, MessageDefinition as _MessagePackage_MessageDefinition } from './MessagePackage/Message';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ChatObjectsPackage: {
    MemberRoomObject: MessageTypeDefinition
    MemberRoomObjectPage: MessageTypeDefinition
    MessageObject: MessageTypeDefinition
    MessageObjectPage: MessageTypeDefinition
    ProfileObject: MessageTypeDefinition
    ProfileObjectPage: MessageTypeDefinition
    RoomObject: MessageTypeDefinition
    RoomObjectPage: MessageTypeDefinition
  }
  CommonObjects: {
    EmptyObject: MessageTypeDefinition
    PaginationRequest: MessageTypeDefinition
    PaginationResponse: MessageTypeDefinition
  }
  MessagePackage: {
    CreateRequest: MessageTypeDefinition
    DeleteRequest: MessageTypeDefinition
    ListRequest: MessageTypeDefinition
    Message: SubtypeConstructor<typeof grpc.Client, _MessagePackage_MessageClient> & { service: _MessagePackage_MessageDefinition }
    UpdateRequest: MessageTypeDefinition
  }
}

