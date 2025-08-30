// Original file: source/types/generated/protos/definitions/message.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _message_CreateRequest, CreateRequest__Output as _message_CreateRequest__Output } from './CreateRequest';
import type { DeleteRequest as _message_DeleteRequest, DeleteRequest__Output as _message_DeleteRequest__Output } from './DeleteRequest';
import type { ListRequest as _message_ListRequest, ListRequest__Output as _message_ListRequest__Output } from './ListRequest';
import type { MessageObject as _chat_objects_MessageObject, MessageObject__Output as _chat_objects_MessageObject__Output } from '../chat_objects/MessageObject';
import type { MessageObjectPage as _chat_objects_MessageObjectPage, MessageObjectPage__Output as _chat_objects_MessageObjectPage__Output } from '../chat_objects/MessageObjectPage';
import type { UpdateRequest as _message_UpdateRequest, UpdateRequest__Output as _message_UpdateRequest__Output } from './UpdateRequest';

export interface MessageClient extends grpc.Client {
  Create(argument: _message_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _message_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _message_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _message_CreateRequest, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _message_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _message_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _message_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  create(argument: _message_CreateRequest, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;

  Delete(argument: _message_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _message_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _message_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _message_DeleteRequest, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _message_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _message_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _message_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _message_DeleteRequest, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;

  List(argument: _message_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _message_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _message_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _message_ListRequest, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _message_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _message_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _message_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _message_ListRequest, callback: grpc.requestCallback<_chat_objects_MessageObjectPage__Output>): grpc.ClientUnaryCall;

  Update(argument: _message_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _message_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _message_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _message_UpdateRequest, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _message_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _message_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _message_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;
  update(argument: _message_UpdateRequest, callback: grpc.requestCallback<_chat_objects_MessageObject__Output>): grpc.ClientUnaryCall;

}

export interface MessageHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_message_CreateRequest__Output, _chat_objects_MessageObject>;

  Delete: grpc.handleUnaryCall<_message_DeleteRequest__Output, _chat_objects_MessageObject>;

  List: grpc.handleUnaryCall<_message_ListRequest__Output, _chat_objects_MessageObjectPage>;

  Update: grpc.handleUnaryCall<_message_UpdateRequest__Output, _chat_objects_MessageObject>;

}

export interface MessageDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_message_CreateRequest, _chat_objects_MessageObject, _message_CreateRequest__Output, _chat_objects_MessageObject__Output>
  Delete: MethodDefinition<_message_DeleteRequest, _chat_objects_MessageObject, _message_DeleteRequest__Output, _chat_objects_MessageObject__Output>
  List: MethodDefinition<_message_ListRequest, _chat_objects_MessageObjectPage, _message_ListRequest__Output, _chat_objects_MessageObjectPage__Output>
  Update: MethodDefinition<_message_UpdateRequest, _chat_objects_MessageObject, _message_UpdateRequest__Output, _chat_objects_MessageObject__Output>
}
