import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { HealthCheckClient as _HealthCheck_HealthCheckClient, HealthCheckDefinition as _HealthCheck_HealthCheckDefinition } from './HealthCheck/HealthCheck';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  CommonObjects: {
    EmptyObject: MessageTypeDefinition
    PaginationRequest: MessageTypeDefinition
    PaginationResponse: MessageTypeDefinition
  }
  HealthCheck: {
    HealthCheck: SubtypeConstructor<typeof grpc.Client, _HealthCheck_HealthCheckClient> & { service: _HealthCheck_HealthCheckDefinition }
    HealthCheckResponse: MessageTypeDefinition
  }
}

