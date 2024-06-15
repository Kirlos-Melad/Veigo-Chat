import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MemberRoomClient as _MemberRoomPackage_MemberRoomClient, MemberRoomDefinition as _MemberRoomPackage_MemberRoomDefinition } from './MemberRoomPackage/MemberRoom';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ChatObjectsPackage: {
    MemberRoomObject: MessageTypeDefinition
    MessageObject: MessageTypeDefinition
    ProfileObject: MessageTypeDefinition
    RoomObject: MessageTypeDefinition
  }
  MemberRoomPackage: {
    AddRequest: MessageTypeDefinition
    LeaveRequest: MessageTypeDefinition
    MemberRoom: SubtypeConstructor<typeof grpc.Client, _MemberRoomPackage_MemberRoomClient> & { service: _MemberRoomPackage_MemberRoomDefinition }
    MemberRoomList: MessageTypeDefinition
  }
}

