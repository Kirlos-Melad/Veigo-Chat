// Original file: source/types/generated/definitions/Room.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _RoomPackage_CreateRequest, CreateRequest__Output as _RoomPackage_CreateRequest__Output } from '../RoomPackage/CreateRequest';
import type { DeleteRequest as _RoomPackage_DeleteRequest, DeleteRequest__Output as _RoomPackage_DeleteRequest__Output } from '../RoomPackage/DeleteRequest';
import type { ReadRequest as _RoomPackage_ReadRequest, ReadRequest__Output as _RoomPackage_ReadRequest__Output } from '../RoomPackage/ReadRequest';
import type { RoomObject as _RoomPackage_RoomObject, RoomObject__Output as _RoomPackage_RoomObject__Output } from '../RoomPackage/RoomObject';
import type { UpdateRequest as _RoomPackage_UpdateRequest, UpdateRequest__Output as _RoomPackage_UpdateRequest__Output } from '../RoomPackage/UpdateRequest';

export interface RoomClient extends grpc.Client {
  Create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _RoomPackage_CreateRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _RoomPackage_CreateRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  
  Delete(argument: _RoomPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _RoomPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _RoomPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _RoomPackage_DeleteRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _RoomPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _RoomPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _RoomPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _RoomPackage_DeleteRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  
  Read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _RoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _RoomPackage_ReadRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _RoomPackage_ReadRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _RoomPackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _RoomPackage_UpdateRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _RoomPackage_UpdateRequest, callback: grpc.requestCallback<_RoomPackage_RoomObject__Output>): grpc.ClientUnaryCall;
  
}

export interface RoomHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_RoomPackage_CreateRequest__Output, _RoomPackage_RoomObject>;
  
  Delete: grpc.handleUnaryCall<_RoomPackage_DeleteRequest__Output, _RoomPackage_RoomObject>;
  
  Read: grpc.handleUnaryCall<_RoomPackage_ReadRequest__Output, _RoomPackage_RoomObject>;
  
  Update: grpc.handleUnaryCall<_RoomPackage_UpdateRequest__Output, _RoomPackage_RoomObject>;
  
}

export interface RoomDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_RoomPackage_CreateRequest, _RoomPackage_RoomObject, _RoomPackage_CreateRequest__Output, _RoomPackage_RoomObject__Output>
  Delete: MethodDefinition<_RoomPackage_DeleteRequest, _RoomPackage_RoomObject, _RoomPackage_DeleteRequest__Output, _RoomPackage_RoomObject__Output>
  Read: MethodDefinition<_RoomPackage_ReadRequest, _RoomPackage_RoomObject, _RoomPackage_ReadRequest__Output, _RoomPackage_RoomObject__Output>
  Update: MethodDefinition<_RoomPackage_UpdateRequest, _RoomPackage_RoomObject, _RoomPackage_UpdateRequest__Output, _RoomPackage_RoomObject__Output>
}
