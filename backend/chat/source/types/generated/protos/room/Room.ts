// Original file: source/types/generated/protos/definitions/room.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateRequest as _room_CreateRequest, CreateRequest__Output as _room_CreateRequest__Output } from '../room/CreateRequest';
import type { CreateResponse as _room_CreateResponse, CreateResponse__Output as _room_CreateResponse__Output } from '../room/CreateResponse';
import type { PaginationRequest as _common_objects_PaginationRequest, PaginationRequest__Output as _common_objects_PaginationRequest__Output } from '../common_objects/PaginationRequest';
import type { RoomObject as _chat_objects_RoomObject, RoomObject__Output as _chat_objects_RoomObject__Output } from '../chat_objects/RoomObject';
import type { RoomObjectPage as _chat_objects_RoomObjectPage, RoomObjectPage__Output as _chat_objects_RoomObjectPage__Output } from '../chat_objects/RoomObjectPage';
import type { UpdateRequest as _room_UpdateRequest, UpdateRequest__Output as _room_UpdateRequest__Output } from '../room/UpdateRequest';

export interface RoomClient extends grpc.Client {
  Create(argument: _room_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  Create(argument: _room_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  Create(argument: _room_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  Create(argument: _room_CreateRequest, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _room_CreateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _room_CreateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _room_CreateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  create(argument: _room_CreateRequest, callback: grpc.requestCallback<_room_CreateResponse__Output>): grpc.ClientUnaryCall;
  
  List(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _common_objects_PaginationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  List(argument: _common_objects_PaginationRequest, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _common_objects_PaginationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _common_objects_PaginationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  list(argument: _common_objects_PaginationRequest, callback: grpc.requestCallback<_chat_objects_RoomObjectPage__Output>): grpc.ClientUnaryCall;
  
  Update(argument: _room_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _room_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _room_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  Update(argument: _room_UpdateRequest, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _room_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _room_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _room_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  update(argument: _room_UpdateRequest, callback: grpc.requestCallback<_chat_objects_RoomObject__Output>): grpc.ClientUnaryCall;
  
}

export interface RoomHandlers extends grpc.UntypedServiceImplementation {
  Create: grpc.handleUnaryCall<_room_CreateRequest__Output, _room_CreateResponse>;
  
  List: grpc.handleUnaryCall<_common_objects_PaginationRequest__Output, _chat_objects_RoomObjectPage>;
  
  Update: grpc.handleUnaryCall<_room_UpdateRequest__Output, _chat_objects_RoomObject>;
  
}

export interface RoomDefinition extends grpc.ServiceDefinition {
  Create: MethodDefinition<_room_CreateRequest, _room_CreateResponse, _room_CreateRequest__Output, _room_CreateResponse__Output>
  List: MethodDefinition<_common_objects_PaginationRequest, _chat_objects_RoomObjectPage, _common_objects_PaginationRequest__Output, _chat_objects_RoomObjectPage__Output>
  Update: MethodDefinition<_room_UpdateRequest, _chat_objects_RoomObject, _room_UpdateRequest__Output, _chat_objects_RoomObject__Output>
}
