// Original file: source/types/generated/protos/definitions/MemberRoom.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddRequest as _MemberRoomPackage_AddRequest, AddRequest__Output as _MemberRoomPackage_AddRequest__Output } from '../MemberRoomPackage/AddRequest';
import type { AddResponse as _MemberRoomPackage_AddResponse, AddResponse__Output as _MemberRoomPackage_AddResponse__Output } from '../MemberRoomPackage/AddResponse';
import type { LeaveRequest as _MemberRoomPackage_LeaveRequest, LeaveRequest__Output as _MemberRoomPackage_LeaveRequest__Output } from '../MemberRoomPackage/LeaveRequest';
import type { ListRequest as _MemberRoomPackage_ListRequest, ListRequest__Output as _MemberRoomPackage_ListRequest__Output } from '../MemberRoomPackage/ListRequest';
import type { ListResponse as _MemberRoomPackage_ListResponse, ListResponse__Output as _MemberRoomPackage_ListResponse__Output } from '../MemberRoomPackage/ListResponse';
import type { MemberRoomObject as _ChatObjectsPackage_MemberRoomObject, MemberRoomObject__Output as _ChatObjectsPackage_MemberRoomObject__Output } from '../ChatObjectsPackage/MemberRoomObject';

export interface MemberRoomClient extends grpc.Client {
  Add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  Add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  Add(argument: _MemberRoomPackage_AddRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  Add(argument: _MemberRoomPackage_AddRequest, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, callback: grpc.requestCallback<_MemberRoomPackage_AddResponse__Output>): grpc.ClientUnaryCall;
  
  Leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _MemberRoomPackage_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _MemberRoomPackage_LeaveRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  
  List(argument: _MemberRoomPackage_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  List(argument: _MemberRoomPackage_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  List(argument: _MemberRoomPackage_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  List(argument: _MemberRoomPackage_ListRequest, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _MemberRoomPackage_ListRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _MemberRoomPackage_ListRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _MemberRoomPackage_ListRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  list(argument: _MemberRoomPackage_ListRequest, callback: grpc.requestCallback<_MemberRoomPackage_ListResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface MemberRoomHandlers extends grpc.UntypedServiceImplementation {
  Add: grpc.handleUnaryCall<_MemberRoomPackage_AddRequest__Output, _MemberRoomPackage_AddResponse>;
  
  Leave: grpc.handleUnaryCall<_MemberRoomPackage_LeaveRequest__Output, _ChatObjectsPackage_MemberRoomObject>;
  
  List: grpc.handleUnaryCall<_MemberRoomPackage_ListRequest__Output, _MemberRoomPackage_ListResponse>;
  
}

export interface MemberRoomDefinition extends grpc.ServiceDefinition {
  Add: MethodDefinition<_MemberRoomPackage_AddRequest, _MemberRoomPackage_AddResponse, _MemberRoomPackage_AddRequest__Output, _MemberRoomPackage_AddResponse__Output>
  Leave: MethodDefinition<_MemberRoomPackage_LeaveRequest, _ChatObjectsPackage_MemberRoomObject, _MemberRoomPackage_LeaveRequest__Output, _ChatObjectsPackage_MemberRoomObject__Output>
  List: MethodDefinition<_MemberRoomPackage_ListRequest, _MemberRoomPackage_ListResponse, _MemberRoomPackage_ListRequest__Output, _MemberRoomPackage_ListResponse__Output>
}
