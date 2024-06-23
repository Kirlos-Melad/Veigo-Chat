import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ProfileClient as _ProfilePackage_ProfileClient, ProfileDefinition as _ProfilePackage_ProfileDefinition } from './ProfilePackage/Profile';

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
  ProfilePackage: {
    CreateRequest: MessageTypeDefinition
    DeleteRequest: MessageTypeDefinition
    Profile: SubtypeConstructor<typeof grpc.Client, _ProfilePackage_ProfileClient> & { service: _ProfilePackage_ProfileDefinition }
    ReadRequest: MessageTypeDefinition
    UpdateRequest: MessageTypeDefinition
  }
}

