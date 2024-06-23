// Original file: source/types/generated/protos/definitions/Profile.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _ProfilePackage_CreateRequest, CreateRequest__Output as _ProfilePackage_CreateRequest__Output } from '../ProfilePackage/CreateRequest';
import type { DeleteRequest as _ProfilePackage_DeleteRequest, DeleteRequest__Output as _ProfilePackage_DeleteRequest__Output } from '../ProfilePackage/DeleteRequest';
import type { ProfileObject as _ChatObjectsPackage_ProfileObject, ProfileObject__Output as _ChatObjectsPackage_ProfileObject__Output } from '../ChatObjectsPackage/ProfileObject';
import type { ReadRequest as _ProfilePackage_ReadRequest, ReadRequest__Output as _ProfilePackage_ReadRequest__Output } from '../ProfilePackage/ReadRequest';
import type { UpdateRequest as _ProfilePackage_UpdateRequest, UpdateRequest__Output as _ProfilePackage_UpdateRequest__Output } from '../ProfilePackage/UpdateRequest';

export interface ProfileClient extends grpc.Client {
  Create(argument: _ProfilePackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _ProfilePackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _ProfilePackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _ProfilePackage_CreateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _ProfilePackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _ProfilePackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _ProfilePackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _ProfilePackage_CreateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  
  Delete(argument: _ProfilePackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _ProfilePackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _ProfilePackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _ProfilePackage_DeleteRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _ProfilePackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _ProfilePackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _ProfilePackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _ProfilePackage_DeleteRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  
  Read(argument: _ProfilePackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _ProfilePackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _ProfilePackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _ProfilePackage_ReadRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _ProfilePackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _ProfilePackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _ProfilePackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _ProfilePackage_ReadRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _ProfilePackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _ProfilePackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _ProfilePackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _ProfilePackage_UpdateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _ProfilePackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _ProfilePackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _ProfilePackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _ProfilePackage_UpdateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_ProfileObject__Output>): grpc.ClientUnaryCall;
  
}

export interface ProfileHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_ProfilePackage_CreateRequest__Output, _ChatObjectsPackage_ProfileObject>;
  
  Delete: grpc.handleUnaryCall<_ProfilePackage_DeleteRequest__Output, _ChatObjectsPackage_ProfileObject>;
  
  Read: grpc.handleUnaryCall<_ProfilePackage_ReadRequest__Output, _ChatObjectsPackage_ProfileObject>;
  
  Update: grpc.handleUnaryCall<_ProfilePackage_UpdateRequest__Output, _ChatObjectsPackage_ProfileObject>;
  
}

export interface ProfileDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_ProfilePackage_CreateRequest, _ChatObjectsPackage_ProfileObject, _ProfilePackage_CreateRequest__Output, _ChatObjectsPackage_ProfileObject__Output>
  Delete: MethodDefinition<_ProfilePackage_DeleteRequest, _ChatObjectsPackage_ProfileObject, _ProfilePackage_DeleteRequest__Output, _ChatObjectsPackage_ProfileObject__Output>
  Read: MethodDefinition<_ProfilePackage_ReadRequest, _ChatObjectsPackage_ProfileObject, _ProfilePackage_ReadRequest__Output, _ChatObjectsPackage_ProfileObject__Output>
  Update: MethodDefinition<_ProfilePackage_UpdateRequest, _ChatObjectsPackage_ProfileObject, _ProfilePackage_UpdateRequest__Output, _ChatObjectsPackage_ProfileObject__Output>
}
