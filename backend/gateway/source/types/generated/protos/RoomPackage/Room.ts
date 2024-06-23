// Original file: source/types/generated/protos/definitions/Room.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _RoomPackage_CreateRequest, CreateRequest__Output as _RoomPackage_CreateRequest__Output } from '../RoomPackage/CreateRequest';
import type { CreateResponse as _RoomPackage_CreateResponse, CreateResponse__Output as _RoomPackage_CreateResponse__Output } from '../RoomPackage/CreateResponse';
import type { PaginationRequest as _CommonObjects_PaginationRequest, PaginationRequest__Output as _CommonObjects_PaginationRequest__Output } from '../CommonObjects/PaginationRequest';
import type { RoomObject as _ChatObjectsPackage_RoomObject, RoomObject__Output as _ChatObjectsPackage_RoomObject__Output } from '../ChatObjectsPackage/RoomObject';
import type { RoomObjectPage as _ChatObjectsPackage_RoomObjectPage, RoomObjectPage__Output as _ChatObjectsPackage_RoomObjectPage__Output } from '../ChatObjectsPackage/RoomObjectPage';
import type { UpdateRequest as _RoomPackage_UpdateRequest, UpdateRequest__Output as _RoomPackage_UpdateRequest__Output } from '../RoomPackage/UpdateRequest';

export interface RoomClient extends grpc.Client {
  Create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, callback: grpc.requestCallback<_RoomPackage_CreateResponse__Output>): grpc.ClientUnaryCall;
  
  List(argument: _CommonObjects_PaginationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _CommonObjects_PaginationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _CommonObjects_PaginationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _CommonObjects_PaginationRequest, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _CommonObjects_PaginationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _CommonObjects_PaginationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _CommonObjects_PaginationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _CommonObjects_PaginationRequest, callback: grpc.requestCallback<_ChatObjectsPackage_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  
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
  Create: grpc.handleUnaryCall<_RoomPackage_CreateRequest__Output, _RoomPackage_CreateResponse>;
  
  List: grpc.handleUnaryCall<_CommonObjects_PaginationRequest__Output, _ChatObjectsPackage_RoomObjectPage>;
  
  Update: grpc.handleUnaryCall<_RoomPackage_UpdateRequest__Output, _ChatObjectsPackage_RoomObject>;
  
}

export interface RoomDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_RoomPackage_CreateRequest, _RoomPackage_CreateResponse, _RoomPackage_CreateRequest__Output, _RoomPackage_CreateResponse__Output>
  List: MethodDefinition<_CommonObjects_PaginationRequest, _ChatObjectsPackage_RoomObjectPage, _CommonObjects_PaginationRequest__Output, _ChatObjectsPackage_RoomObjectPage__Output>
  Update: MethodDefinition<_RoomPackage_UpdateRequest, _ChatObjectsPackage_RoomObject, _RoomPackage_UpdateRequest__Output, _ChatObjectsPackage_RoomObject__Output>
}
