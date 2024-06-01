import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ProfileClient as _ProfilePackage_ProfileClient, ProfileDefinition as _ProfilePackage_ProfileDefinition } from './ProfilePackage/Profile';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ProfilePackage: {
    CreateRequest: MessageTypeDefinition
    DeleteRequest: MessageTypeDefinition
    Profile: SubtypeConstructor<typeof grpc.Client, _ProfilePackage_ProfileClient> & { service: _ProfilePackage_ProfileDefinition }
    ProfileObject: MessageTypeDefinition
    ReadRequest: MessageTypeDefinition
    UpdateRequest: MessageTypeDefinition
  }
}

