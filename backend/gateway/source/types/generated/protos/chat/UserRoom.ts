import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserRoomClient as _UserRoomPackage_UserRoomClient, UserRoomDefinition as _UserRoomPackage_UserRoomDefinition } from './UserRoomPackage/UserRoom';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  UserRoomPackage: {
    CreateRequest: MessageTypeDefinition
    DeleteRequest: MessageTypeDefinition
    ReadRequest: MessageTypeDefinition
    UserRoom: SubtypeConstructor<typeof grpc.Client, _UserRoomPackage_UserRoomClient> & { service: _UserRoomPackage_UserRoomDefinition }
    UserRoomObject: MessageTypeDefinition
  }
}

