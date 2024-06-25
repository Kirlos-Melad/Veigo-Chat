import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ProfileClient as _profile_ProfileClient, ProfileDefinition as _profile_ProfileDefinition } from './profile/Profile';

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
  profile: {
    CreateRequest: MessageTypeDefinition
    DeleteRequest: MessageTypeDefinition
    Profile: SubtypeConstructor<typeof grpc.Client, _profile_ProfileClient> & { service: _profile_ProfileDefinition }
    ReadRequest: MessageTypeDefinition
    UpdateRequest: MessageTypeDefinition
  }
}

