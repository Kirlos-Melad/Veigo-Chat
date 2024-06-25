// Original file: source/types/generated/protos/definitions/member_room.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddRequest as _member_room_AddRequest, AddRequest__Output as _member_room_AddRequest__Output } from '../member_room/AddRequest';
import type { AddResponse as _member_room_AddResponse, AddResponse__Output as _member_room_AddResponse__Output } from '../member_room/AddResponse';
import type { LeaveRequest as _member_room_LeaveRequest, LeaveRequest__Output as _member_room_LeaveRequest__Output } from '../member_room/LeaveRequest';
import type { ListRequest as _member_room_ListRequest, ListRequest__Output as _member_room_ListRequest__Output } from '../member_room/ListRequest';
import type { ListResponse as _member_room_ListResponse, ListResponse__Output as _member_room_ListResponse__Output } from '../member_room/ListResponse';
import type { MemberRoomObject as _chat_objects_MemberRoomObject, MemberRoomObject__Output as _chat_objects_MemberRoomObject__Output } from '../chat_objects/MemberRoomObject';

export interface MemberRoomClient extends grpc.Client {
  Add(argument: _member_room_AddRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  Add(argument: _member_room_AddRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  Add(argument: _member_room_AddRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  Add(argument: _member_room_AddRequest, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _member_room_AddRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _member_room_AddRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _member_room_AddRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _member_room_AddRequest, callback: grpc.requestCallback<_member_room_AddResponse__Output>): grpc.ClientUnaryCall;
  
  Leave(argument: _member_room_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _member_room_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _member_room_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _member_room_LeaveRequest, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _member_room_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _member_room_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _member_room_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _member_room_LeaveRequest, callback: grpc.requestCallback<_chat_objects_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  
  List(argument: _member_room_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  List(argument: _member_room_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  List(argument: _member_room_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  List(argument: _member_room_ListRequest, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _member_room_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _member_room_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _member_room_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _member_room_ListRequest, callback: grpc.requestCallback<_member_room_ListResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface MemberRoomHandlers extends grpc.UntypedServiceImplementation {
  Add: grpc.handleUnaryCall<_member_room_AddRequest__Output, _member_room_AddResponse>;
  
  Leave: grpc.handleUnaryCall<_member_room_LeaveRequest__Output, _chat_objects_MemberRoomObject>;
  
  List: grpc.handleUnaryCall<_member_room_ListRequest__Output, _member_room_ListResponse>;
  
}

export interface MemberRoomDefinition extends grpc.ServiceDefinition {
  Add: MethodDefinition<_member_room_AddRequest, _member_room_AddResponse, _member_room_AddRequest__Output, _member_room_AddResponse__Output>
  Leave: MethodDefinition<_member_room_LeaveRequest, _chat_objects_MemberRoomObject, _member_room_LeaveRequest__Output, _chat_objects_MemberRoomObject__Output>
  List: MethodDefinition<_member_room_ListRequest, _member_room_ListResponse, _member_room_ListRequest__Output, _member_room_ListResponse__Output>
}
