// Original file: source/types/generated/protos/definitions/HealthCheck.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EmptyObject as _CommonObjects_EmptyObject, EmptyObject__Output as _CommonObjects_EmptyObject__Output } from '../CommonObjects/EmptyObject';
import type { HealthCheckResponse as _HealthCheck_HealthCheckResponse, HealthCheckResponse__Output as _HealthCheck_HealthCheckResponse__Output } from '../HealthCheck/HealthCheckResponse';

export interface HealthCheckClient extends grpc.Client {
  Check(argument: _CommonObjects_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  Check(argument: _CommonObjects_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  Check(argument: _CommonObjects_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  Check(argument: _CommonObjects_EmptyObject, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _CommonObjects_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _CommonObjects_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _CommonObjects_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _CommonObjects_EmptyObject, callback: grpc.requestCallback<_HealthCheck_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface HealthCheckHandlers extends grpc.UntypedServiceImplementation {
  Check: grpc.handleUnaryCall<_CommonObjects_EmptyObject__Output, _HealthCheck_HealthCheckResponse>;
  
}

export interface HealthCheckDefinition extends grpc.ServiceDefinition {
  Check: MethodDefinition<_CommonObjects_EmptyObject, _HealthCheck_HealthCheckResponse, _CommonObjects_EmptyObject__Output, _HealthCheck_HealthCheckResponse__Output>
}
