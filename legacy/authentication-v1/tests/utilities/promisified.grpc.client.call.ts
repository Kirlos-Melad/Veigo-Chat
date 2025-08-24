import { ClientUnaryCall, Metadata, ServiceError } from "@grpc/grpc-js";
import { CallOptions, UnaryCallback } from "@grpc/grpc-js/build/src/client";

type ClientCall<Request, Response> = (
    argument: Request,
    callback: UnaryCallback<Response>,
) => ClientUnaryCall;

type ClientCallWithMetadataOrCallOptions<Request, Response> = (
    argument: Request,
    metadata: Metadata | CallOptions,
    callback: UnaryCallback<Response>,
) => ClientUnaryCall;

type ClientCallWithMetadataAndCallOptions<Request, Response> = (
    argument: Request,
    metadata: Metadata,
    options: CallOptions,
    callback: UnaryCallback<Response>,
) => ClientUnaryCall;

export async function promisifiedGrpcClientCall<Request, Response>(
    clientCall:
        | ClientCall<Request, Response>
        | ClientCallWithMetadataOrCallOptions<Request, Response>
        | ClientCallWithMetadataAndCallOptions<Request, Response>,
    data: Request,
    additionalData: {
        metadata?: Metadata;
        options?: CallOptions;
    } = {},
): Promise<Response | undefined> {
    const { metadata, options } = additionalData;

    return await new Promise<Response | undefined>((resolve, reject) => {
        // Determine which overload is being used
        if (metadata && options) {
            // Call the clientCall function with metadata and options
            (
                clientCall as ClientCallWithMetadataAndCallOptions<
                    Request,
                    Response
                >
            )(
                data,
                metadata,
                options,
                (
                    error: ServiceError | null,
                    response: Response | undefined,
                ) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                },
            );
        } else if (metadata || options) {
            // Call the clientCall function with metadata or options
            (
                clientCall as ClientCallWithMetadataOrCallOptions<
                    Request,
                    Response
                >
            )(
                data,
                metadata ? metadata : options!,
                (
                    error: ServiceError | null,
                    response: Response | undefined,
                ) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                },
            );
        } else {
            // Call the clientCall function with only data and callback
            (clientCall as ClientCall<Request, Response>)(
                data,
                (
                    error: ServiceError | null,
                    response: Response | undefined,
                ) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(response);
                    }
                },
            );
        }
    });
}
