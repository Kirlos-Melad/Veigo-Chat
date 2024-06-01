import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MemberRoomClient as _MemberRoomPackage_MemberRoomClient, MemberRoomDefinition as _MemberRoomPackage_MemberRoomDefinition } from './MemberRoomPackage/MemberRoom';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  MemberRoomPackage: {
    CreateRequest: MessageTypeDefinition
    DeleteRequest: MessageTypeDefinition
    MemberRoom: SubtypeConstructor<typeof grpc.Client, _MemberRoomPackage_MemberRoomClient> & { service: _MemberRoomPackage_MemberRoomDefinition }
    MemberRoomObject: MessageTypeDefinition
    ReadRequest: MessageTypeDefinition
  }
}

