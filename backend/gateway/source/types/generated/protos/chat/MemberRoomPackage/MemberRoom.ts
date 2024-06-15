// Original file: source/types/generated/protos/chat/definitions/MemberRoom.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddRequest as _MemberRoomPackage_AddRequest, AddRequest__Output as _MemberRoomPackage_AddRequest__Output } from '../MemberRoomPackage/AddRequest';
import type { LeaveRequest as _MemberRoomPackage_LeaveRequest, LeaveRequest__Output as _MemberRoomPackage_LeaveRequest__Output } from '../MemberRoomPackage/LeaveRequest';
import type { MemberRoomList as _MemberRoomPackage_MemberRoomList, MemberRoomList__Output as _MemberRoomPackage_MemberRoomList__Output } from '../MemberRoomPackage/MemberRoomList';
import type { MemberRoomObject as _ChatObjectsPackage_MemberRoomObject, MemberRoomObject__Output as _ChatObjectsPackage_MemberRoomObject__Output } from '../ChatObjectsPackage/MemberRoomObject';

export interface MemberRoomClient extends grpc.Client {
  Add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  Add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  Add(argument: _MemberRoomPackage_AddRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  Add(argument: _MemberRoomPackage_AddRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  add(argument: _MemberRoomPackage_AddRequest, callback: grpc.requestCallback<_MemberRoomPackage_MemberRoomList__Output>): grpc.ClientUnaryCall;
  
  Leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _MemberRoomPackage_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  Leave(argument: _MemberRoomPackage_LeaveRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  leave(argument: _MemberRoomPackage_LeaveRequest, callback: grpc.requestCallback<_ChatObjectsPackage_MemberRoomObject__Output>): grpc.ClientUnaryCall;
  
}

export interface MemberRoomHandlers extends grpc.UntypedServiceImplementation {
  Add: grpc.handleUnaryCall<_MemberRoomPackage_AddRequest__Output, _MemberRoomPackage_MemberRoomList>;
  
  Leave: grpc.handleUnaryCall<_MemberRoomPackage_LeaveRequest__Output, _ChatObjectsPackage_MemberRoomObject>;
  
}

export interface MemberRoomDefinition extends grpc.ServiceDefinition {
  Add: MethodDefinition<_MemberRoomPackage_AddRequest, _MemberRoomPackage_MemberRoomList, _MemberRoomPackage_AddRequest__Output, _MemberRoomPackage_MemberRoomList__Output>
  Leave: MethodDefinition<_MemberRoomPackage_LeaveRequest, _ChatObjectsPackage_MemberRoomObject, _MemberRoomPackage_LeaveRequest__Output, _ChatObjectsPackage_MemberRoomObject__Output>
}
