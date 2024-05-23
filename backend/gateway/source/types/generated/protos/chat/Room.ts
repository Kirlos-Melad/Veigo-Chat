import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { RoomClient as _RoomPackage_RoomClient, RoomDefinition as _RoomPackage_RoomDefinition } from './RoomPackage/Room';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  RoomPackage: {
    CreateRequest: MessageTypeDefinition
    DeleteRequest: MessageTypeDefinition
    ReadRequest: MessageTypeDefinition
    Room: SubtypeConstructor<typeof grpc.Client, _RoomPackage_RoomClient> & { service: _RoomPackage_RoomDefinition }
    RoomObject: MessageTypeDefinition
    UpdateRequest: MessageTypeDefinition
  }
}

