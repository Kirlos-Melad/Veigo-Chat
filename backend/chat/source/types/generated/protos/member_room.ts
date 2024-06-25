import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MemberRoomClient as _member_room_MemberRoomClient, MemberRoomDefinition as _member_room_MemberRoomDefinition } from './member_room/MemberRoom';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chat_objects: {
    MemberRoomObject: MessageTypeDefinition
    MemberRoomObjectPage: MessageTypeDefinition
    MessageObject: MessageTypeDefinition
    MessageObjectPage: MessageTypeDefinition
    ProfileObject: MessageTypeDefinition
    ProfileObjectPage: MessageTypeDefinition
    RoomObject: MessageTypeDefinition
    RoomObjectPage: MessageTypeDefinition
  }
  common_objects: {
    EmptyObject: MessageTypeDefinition
    PaginationRequest: MessageTypeDefinition
    PaginationResponse: MessageTypeDefinition
  }
  member_room: {
    AddRequest: MessageTypeDefinition
    AddResponse: MessageTypeDefinition
    LeaveRequest: MessageTypeDefinition
    ListRequest: MessageTypeDefinition
    ListResponse: MessageTypeDefinition
    MemberRoom: SubtypeConstructor<typeof grpc.Client, _member_room_MemberRoomClient> & { service: _member_room_MemberRoomDefinition }
  }
}

