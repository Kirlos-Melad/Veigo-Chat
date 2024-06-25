// Original file: source/types/generated/protos/definitions/profile.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _profile_CreateRequest, CreateRequest__Output as _profile_CreateRequest__Output } from '../profile/CreateRequest';
import type { DeleteRequest as _profile_DeleteRequest, DeleteRequest__Output as _profile_DeleteRequest__Output } from '../profile/DeleteRequest';
import type { ProfileObject as _chat_objects_ProfileObject, ProfileObject__Output as _chat_objects_ProfileObject__Output } from '../chat_objects/ProfileObject';
import type { ReadRequest as _profile_ReadRequest, ReadRequest__Output as _profile_ReadRequest__Output } from '../profile/ReadRequest';
import type { UpdateRequest as _profile_UpdateRequest, UpdateRequest__Output as _profile_UpdateRequest__Output } from '../profile/UpdateRequest';

export interface ProfileClient extends grpc.Client {
  Create(argument: _profile_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _profile_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _profile_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Create(argument: _profile_CreateRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _profile_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _profile_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _profile_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  create(argument: _profile_CreateRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  
  Delete(argument: _profile_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _profile_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _profile_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Delete(argument: _profile_DeleteRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _profile_DeleteRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _profile_DeleteRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _profile_DeleteRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  delete(argument: _profile_DeleteRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  
  Read(argument: _profile_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _profile_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _profile_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Read(argument: _profile_ReadRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _profile_ReadRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _profile_ReadRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _profile_ReadRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  read(argument: _profile_ReadRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _profile_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _profile_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _profile_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _profile_UpdateRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _profile_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _profile_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _profile_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  update(argument: _profile_UpdateRequest, callback: grpc.requestCallback<_chat_objects_ProfileObject__Output>): grpc.ClientUnaryCall;
  
}

export interface ProfileHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_profile_CreateRequest__Output, _chat_objects_ProfileObject>;
  
  Delete: grpc.handleUnaryCall<_profile_DeleteRequest__Output, _chat_objects_ProfileObject>;
  
  Read: grpc.handleUnaryCall<_profile_ReadRequest__Output, _chat_objects_ProfileObject>;
  
  Update: grpc.handleUnaryCall<_profile_UpdateRequest__Output, _chat_objects_ProfileObject>;
  
}

export interface ProfileDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_profile_CreateRequest, _chat_objects_ProfileObject, _profile_CreateRequest__Output, _chat_objects_ProfileObject__Output>
  Delete: MethodDefinition<_profile_DeleteRequest, _chat_objects_ProfileObject, _profile_DeleteRequest__Output, _chat_objects_ProfileObject__Output>
  Read: MethodDefinition<_profile_ReadRequest, _chat_objects_ProfileObject, _profile_ReadRequest__Output, _chat_objects_ProfileObject__Output>
  Update: MethodDefinition<_profile_UpdateRequest, _chat_objects_ProfileObject, _profile_UpdateRequest__Output, _chat_objects_ProfileObject__Output>
}
