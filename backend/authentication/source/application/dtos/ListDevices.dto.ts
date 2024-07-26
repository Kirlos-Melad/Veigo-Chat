import { z } from "zod";

import { Dto } from "@source/application/dtos/Dto";
import { PaginationRequest } from "@source/types/generated/protos/common_objects/PaginationRequest";

type ListDevicesSerialized = PaginationRequest;

class ListDevicesDto extends Dto<ListDevicesSerialized> {
    public constructor() {
        super(
            z.object({
                cursor: z.string().optional(),
                size: z.number().optional().default(10),
            }),
        );
    }
}

export { ListDevicesDto };
export type { ListDevicesSerialized };
