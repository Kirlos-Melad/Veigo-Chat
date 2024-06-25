import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { HealthCheckClient as _health_check_HealthCheckClient, HealthCheckDefinition as _health_check_HealthCheckDefinition } from './health_check/HealthCheck';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  common_objects: {
    EmptyObject: MessageTypeDefinition
    PaginationRequest: MessageTypeDefinition
    PaginationResponse: MessageTypeDefinition
  }
  health_check: {
    HealthCheck: SubtypeConstructor<typeof grpc.Client, _health_check_HealthCheckClient> & { service: _health_check_HealthCheckDefinition }
    HealthCheckResponse: MessageTypeDefinition
  }
}

