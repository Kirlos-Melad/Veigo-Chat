// Original file: source/types/generated/protos/definitions/MemberRoom.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _MemberRoomPackage_CreateRequest, CreateRequest__Output as _MemberRoomPackage_CreateRequest__Output } from '../MemberRoomPackage/CreateRequest';
import type { DeleteRequest as _MemberRoomPackage_DeleteRequest, DeleteRequest__Output as _MemberRoomPackage_DeleteRequest__Output } from '../MemberRoomPackage/DeleteRequest';
import type { MemberRoomObject as _MemberRoomPackage_MemberRoomObject, MemberRoomObject__Output as _MemberRoomPackage_MemberRoomObject__Output } from '../MemberRoomPackage/MemberRoomObject';
import type { ReadRequest as _MemberRoomPackage_ReadRequest, ReadRequest__Output as _MemberRoomPackage_ReadRequest__Output } from '../MemberRoomPackage/ReadRequest';

export interface MemberRoomClient extends grpc.Client {
  Create(argument: _MemberRoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MemberRoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MemberRoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MemberRoomPackage_CreateRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MemberRoomPackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MemberRoomPackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MemberRoomPackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MemberRoomPackage_CreateRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  
  Delete(argument: _MemberRoomPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MemberRoomPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MemberRoomPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MemberRoomPackage_DeleteRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MemberRoomPackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MemberRoomPackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MemberRoomPackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MemberRoomPackage_DeleteRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  
  Read(argument: _MemberRoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _MemberRoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _MemberRoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _MemberRoomPackage_ReadRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MemberRoomPackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MemberRoomPackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MemberRoomPackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MemberRoomPackage_ReadRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  
}

export interface MemberRoomHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_MemberRoomPackage_CreateRequest__Output, _MemberRoomPackage_MemberRoomObject>;
  
  Delete: grpc.handleUnaryCall<_MemberRoomPackage_DeleteRequest__Output, _MemberRoomPackage_MemberRoomObject>;
  
  Read: grpc.handleUnaryCall<_MemberRoomPackage_ReadRequest__Output, _MemberRoomPackage_MemberRoomObject>;
  
}

export interface MemberRoomDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_MemberRoomPackage_CreateRequest, _MemberRoomPackage_MemberRoomObject, _MemberRoomPackage_CreateRequest__Output, _MemberRoomPackage_MemberRoomObject__Output>
  Delete: MethodDefinition<_MemberRoomPackage_DeleteRequest, _MemberRoomPackage_MemberRoomObject, _MemberRoomPackage_DeleteRequest__Output, _MemberRoomPackage_MemberRoomObject__Output>
  Read: MethodDefinition<_MemberRoomPackage_ReadRequest, _MemberRoomPackage_MemberRoomObject, _MemberRoomPackage_ReadRequest__Output, _MemberRoomPackage_MemberRoomObject__Output>
}
