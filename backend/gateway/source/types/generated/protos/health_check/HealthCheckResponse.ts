// Original file: source/types/generated/protos/definitions/health_check.proto


// Original file: source/types/generated/protos/definitions/health_check.proto

export const _health_check_HealthCheckResponse_ServingStatus = {
  UNKNOWN: 0,
  SERVING: 1,
  NOT_SERVING: 2,
} as const;

export type _health_check_HealthCheckResponse_ServingStatus =
  | 'UNKNOWN'
  | 0
  | 'SERVING'
  | 1
  | 'NOT_SERVING'
  | 2

export type _health_check_HealthCheckResponse_ServingStatus__Output = typeof _health_check_HealthCheckResponse_ServingStatus[keyof typeof _health_check_HealthCheckResponse_ServingStatus]

export interface HealthCheckResponse {
  'status'?: (_health_check_HealthCheckResponse_ServingStatus);
}

export interface HealthCheckResponse__Output {
  'status'?: (_health_check_HealthCheckResponse_ServingStatus__Output);
}
