// Original file: source/types/generated/protos/definitions/health_check.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EmptyObject as _common_objects_EmptyObject, EmptyObject__Output as _common_objects_EmptyObject__Output } from '../common_objects/EmptyObject';
import type { HealthCheckResponse as _health_check_HealthCheckResponse, HealthCheckResponse__Output as _health_check_HealthCheckResponse__Output } from '../health_check/HealthCheckResponse';

export interface HealthCheckClient extends grpc.Client {
  Check(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  Check(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  Check(argument: _common_objects_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  Check(argument: _common_objects_EmptyObject, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _common_objects_EmptyObject, metadata: grpc.Metadata, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _common_objects_EmptyObject, options: grpc.CallOptions, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  check(argument: _common_objects_EmptyObject, callback: grpc.requestCallback<_health_check_HealthCheckResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface HealthCheckHandlers extends grpc.UntypedServiceImplementation {
  Check: grpc.handleUnaryCall<_common_objects_EmptyObject__Output, _health_check_HealthCheckResponse>;
  
}

export interface HealthCheckDefinition extends grpc.ServiceDefinition {
  Check: MethodDefinition<_common_objects_EmptyObject, _health_check_HealthCheckResponse, _common_objects_EmptyObject__Output, _health_check_HealthCheckResponse__Output>
}
