// Original file: source/types/generated/protos/definitions/Room.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _RoomPackage_CreateRequest, CreateRequest__Output as _RoomPackage_CreateRequest__Output } from '../RoomPackage/CreateRequest';
import type { ReadRequest as _RoomPackage_ReadRequest, ReadRequest__Output as _RoomPackage_ReadRequest__Output } from '../RoomPackage/ReadRequest';
import type { RoomInformation as _RoomPackage_RoomInformation, RoomInformation__Output as _RoomPackage_RoomInformation__Output } from '../RoomPackage/RoomInformation';
import type { RoomObject as _ChatObjectsPackage_RoomObject, RoomObject__Output as _ChatObjectsPackage_RoomObject__Output } from '../ChatObjectsPackage/RoomObject';
import type { UpdateRequest as _RoomPackage_UpdateRequest, UpdateRequest__Output as _RoomPackage_UpdateRequest__Output } from '../RoomPackage/UpdateRequest';

export interface RoomClient extends grpc.Client {
  Create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  
  Read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  Read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  Read(argument: _RoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  Read(argument: _RoomPackage_ReadRequest, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, callback: grpc.requestCallback<_RoomPackage_RoomInformation__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _RoomPackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _RoomPackage_UpdateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  
}

export interface RoomHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_RoomPackage_CreateRequest__Output, _RoomPackage_RoomInformation>;
  
  Read: grpc.handleUnaryCall<_RoomPackage_ReadRequest__Output, _RoomPackage_RoomInformation>;
  
  Update: grpc.handleUnaryCall<_RoomPackage_UpdateRequest__Output, _ChatObjectsPackage_RoomObject>;
  
}

export interface RoomDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_RoomPackage_CreateRequest, _RoomPackage_RoomInformation, _RoomPackage_CreateRequest__Output, _RoomPackage_RoomInformation__Output>
  Read: MethodDefinition<_RoomPackage_ReadRequest, _RoomPackage_RoomInformation, _RoomPackage_ReadRequest__Output, _RoomPackage_RoomInformation__Output>
  Update: MethodDefinition<_RoomPackage_UpdateRequest, _ChatObjectsPackage_RoomObject, _RoomPackage_UpdateRequest__Output, _ChatObjectsPackage_RoomObject__Output>
}
