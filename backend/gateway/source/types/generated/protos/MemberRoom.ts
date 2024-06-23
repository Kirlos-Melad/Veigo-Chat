import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MemberRoomClient as _MemberRoomPackage_MemberRoomClient, MemberRoomDefinition as _MemberRoomPackage_MemberRoomDefinition } from './MemberRoomPackage/MemberRoom';

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
  MemberRoomPackage: {
    AddRequest: MessageTypeDefinition
    AddResponse: MessageTypeDefinition
    LeaveRequest: MessageTypeDefinition
    ListRequest: MessageTypeDefinition
    ListResponse: MessageTypeDefinition
    MemberRoom: SubtypeConstructor<typeof grpc.Client, _MemberRoomPackage_MemberRoomClient> & { service: _MemberRoomPackage_MemberRoomDefinition }
  }
}

