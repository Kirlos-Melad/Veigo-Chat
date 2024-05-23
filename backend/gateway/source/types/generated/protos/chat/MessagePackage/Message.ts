// Original file: source/types/generated/protos/chat/definitions/Message.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _MessagePackage_CreateRequest, CreateRequest__Output as _MessagePackage_CreateRequest__Output } from '../MessagePackage/CreateRequest';
import type { DeleteRequest as _MessagePackage_DeleteRequest, DeleteRequest__Output as _MessagePackage_DeleteRequest__Output } from '../MessagePackage/DeleteRequest';
import type { MessageObject as _MessagePackage_MessageObject, MessageObject__Output as _MessagePackage_MessageObject__Output } from '../MessagePackage/MessageObject';
import type { ReadRequest as _MessagePackage_ReadRequest, ReadRequest__Output as _MessagePackage_ReadRequest__Output } from '../MessagePackage/ReadRequest';
import type { UpdateRequest as _MessagePackage_UpdateRequest, UpdateRequest__Output as _MessagePackage_UpdateRequest__Output } from '../MessagePackage/UpdateRequest';

export interface MessageClient extends grpc.Client {
  Create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MessagePackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MessagePackage_CreateRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  
  Delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MessagePackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MessagePackage_DeleteRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  
  Read(argument: _MessagePackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _MessagePackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _MessagePackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _MessagePackage_ReadRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MessagePackage_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MessagePackage_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MessagePackage_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  read(argument: _MessagePackage_ReadRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _MessagePackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _MessagePackage_UpdateRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, callback: grpc.requestCallback<_MessagePackage_MessageObject__Output>): grpc.ClientUnaryCall;
  
}

export interface MessageHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_MessagePackage_CreateRequest__Output, _MessagePackage_MessageObject>;
  
  Delete: grpc.handleUnaryCall<_MessagePackage_DeleteRequest__Output, _MessagePackage_MessageObject>;
  
  Read: grpc.handleUnaryCall<_MessagePackage_ReadRequest__Output, _MessagePackage_MessageObject>;
  
  Update: grpc.handleUnaryCall<_MessagePackage_UpdateRequest__Output, _MessagePackage_MessageObject>;
  
}

export interface MessageDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_MessagePackage_CreateRequest, _MessagePackage_MessageObject, _MessagePackage_CreateRequest__Output, _MessagePackage_MessageObject__Output>
  Delete: MethodDefinition<_MessagePackage_DeleteRequest, _MessagePackage_MessageObject, _MessagePackage_DeleteRequest__Output, _MessagePackage_MessageObject__Output>
  Read: MethodDefinition<_MessagePackage_ReadRequest, _MessagePackage_MessageObject, _MessagePackage_ReadRequest__Output, _MessagePackage_MessageObject__Output>
  Update: MethodDefinition<_MessagePackage_UpdateRequest, _MessagePackage_MessageObject, _MessagePackage_UpdateRequest__Output, _MessagePackage_MessageObject__Output>
}
