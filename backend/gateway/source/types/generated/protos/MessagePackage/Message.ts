// Original file: source/types/generated/protos/definitions/Message.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _MessagePackage_CreateRequest, CreateRequest__Output as _MessagePackage_CreateRequest__Output } from '../MessagePackage/CreateRequest';
import type { DeleteRequest as _MessagePackage_DeleteRequest, DeleteRequest__Output as _MessagePackage_DeleteRequest__Output } from '../MessagePackage/DeleteRequest';
import type { ListRequest as _MessagePackage_ListRequest, ListRequest__Output as _MessagePackage_ListRequest__Output } from '../MessagePackage/ListRequest';
import type { MessageObject as _ChatObjectsPackage_MessageObject, MessageObject__Output as _ChatObjectsPackage_MessageObject__Output } from '../ChatObjectsPackage/MessageObject';
import type { MessageObjectPage as _ChatObjectsPackage_MessageObjectPage, MessageObjectPage__Output as _ChatObjectsPackage_MessageObjectPage__Output } from '../ChatObjectsPackage/MessageObjectPage';
import type { UpdateRequest as _MessagePackage_UpdateRequest, UpdateRequest__Output as _MessagePackage_UpdateRequest__Output } from '../MessagePackage/UpdateRequest';

export interface MessageClient extends grpc.Client {
  Create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MessagePackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _MessagePackage_CreateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _MessagePackage_CreateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  
  Delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MessagePackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _MessagePackage_DeleteRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _MessagePackage_DeleteRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  
  List(argument: _MessagePackage_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _MessagePackage_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _MessagePackage_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _MessagePackage_ListRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _MessagePackage_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _MessagePackage_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _MessagePackage_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _MessagePackage_ListRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _MessagePackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _MessagePackage_UpdateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _MessagePackage_UpdateRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MessageObject__Output>): grpc.ClientUnaryCall;
  
}

export interface MessageHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_MessagePackage_CreateRequest__Output, _ChatObjectsPackage_MessageObject>;
  
  Delete: grpc.handleUnaryCall<_MessagePackage_DeleteRequest__Output, _ChatObjectsPackage_MessageObject>;
  
  List: grpc.handleUnaryCall<_MessagePackage_ListRequest__Output, _ChatObjectsPackage_MessageObjectPage>;
  
  Update: grpc.handleUnaryCall<_MessagePackage_UpdateRequest__Output, _ChatObjectsPackage_MessageObject>;
  
}

export interface MessageDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_MessagePackage_CreateRequest, _ChatObjectsPackage_MessageObject, _MessagePackage_CreateRequest__Output, _ChatObjectsPackage_MessageObject__Output>
  Delete: MethodDefinition<_MessagePackage_DeleteRequest, _ChatObjectsPackage_MessageObject, _MessagePackage_DeleteRequest__Output, _ChatObjectsPackage_MessageObject__Output>
  List: MethodDefinition<_MessagePackage_ListRequest, _ChatObjectsPackage_MessageObjectPage, _MessagePackage_ListRequest__Output, _ChatObjectsPackage_MessageObjectPage__Output>
  Update: MethodDefinition<_MessagePackage_UpdateRequest, _ChatObjectsPackage_MessageObject, _MessagePackage_UpdateRequest__Output, _ChatObjectsPackage_MessageObject__Output>
}
