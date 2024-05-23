// Original file: source/types/generated/protos/chat/definitions/UserRoom.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _UserRoomPackage_CreateRequest, CreateRequest__Output as _UserRoomPackage_CreateRequest__Output } from '../UserRoomPackage/CreateRequest';
import type { DeleteRequest as _UserRoomPackage_DeleteRequest, DeleteRequest__Output as _UserRoomPackage_DeleteRequest__Output } from '../UserRoomPackage/DeleteRequest';
import type { ReadRequest as _UserRoomPackage_ReadRequest, ReadRequest__Output as _UserRoomPackage_ReadRequest__Output } from '../UserRoomPackage/ReadRequest';
import type { UserRoomObject as _UserRoomPackage_UserRoomObject, UserRoomObject__Output as _UserRoomPackage_UserRoomObject__Output } from '../UserRoomPackage/UserRoomObject';

export interface UserRoomClient extends grpc.Client {
  Create(argument: _UserRoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _UserRoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _UserRoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _UserRoomPackage_CreateRequest, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _UserRoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _UserRoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _UserRoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _UserRoomPackage_CreateRequest, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  
  Delete(argument: _UserRoomPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _UserRoomPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _UserRoomPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _UserRoomPackage_DeleteRequest, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserRoomPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserRoomPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserRoomPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _UserRoomPackage_DeleteRequest, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  
  Read(argument: _UserRoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _UserRoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _UserRoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _UserRoomPackage_ReadRequest, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _UserRoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _UserRoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _UserRoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _UserRoomPackage_ReadRequest, callback: grpc.requestCallback<_UserRoomPackage_UserRoomObject__Output>): grpc.ClientUnaryCall;
  
}

export interface UserRoomHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_UserRoomPackage_CreateRequest__Output, _UserRoomPackage_UserRoomObject>;
  
  Delete: grpc.handleUnaryCall<_UserRoomPackage_DeleteRequest__Output, _UserRoomPackage_UserRoomObject>;
  
  Read: grpc.handleUnaryCall<_UserRoomPackage_ReadRequest__Output, _UserRoomPackage_UserRoomObject>;
  
}

export interface UserRoomDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_UserRoomPackage_CreateRequest, _UserRoomPackage_UserRoomObject, _UserRoomPackage_CreateRequest__Output, _UserRoomPackage_UserRoomObject__Output>
  Delete: MethodDefinition<_UserRoomPackage_DeleteRequest, _UserRoomPackage_UserRoomObject, _UserRoomPackage_DeleteRequest__Output, _UserRoomPackage_UserRoomObject__Output>
  Read: MethodDefinition<_UserRoomPackage_ReadRequest, _UserRoomPackage_UserRoomObject, _UserRoomPackage_ReadRequest__Output, _UserRoomPackage_UserRoomObject__Output>
}
