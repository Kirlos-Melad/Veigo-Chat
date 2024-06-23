// Original file: source/types/generated/protos/definitions/HealthCheck.proto


// Original file: source/types/generated/protos/definitions/HealthCheck.proto

export const _HealthCheck_HealthCheckResponse_ServingStatus = {
  UNKNOWN: 0,
  SERVING: 1,
  NOT_SERVING: 2,
} as const;

export type _HealthCheck_HealthCheckResponse_ServingStatus =
  | 'UNKNOWN'
  | 0
  | 'SERVING'
  | 1
  | 'NOT_SERVING'
  | 2

export type _HealthCheck_HealthCheckResponse_ServingStatus__Output = typeof _HealthCheck_HealthCheckResponse_ServingStatus[keyof typeof _HealthCheck_HealthCheckResponse_ServingStatus]

export interface HealthCheckResponse {
  'status'?: (_HealthCheck_HealthCheckResponse_ServingStatus);
}

export interface HealthCheckResponse__Output {
  'status'?: (_HealthCheck_HealthCheckResponse_ServingStatus__Output);
}
