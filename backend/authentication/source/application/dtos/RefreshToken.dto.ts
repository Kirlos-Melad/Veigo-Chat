import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type RefreshTokenSerialized = { token: string };

class RefreshTokenDto extends Dto<RefreshTokenSerialized> {
    public constructor() {
        super(
            z.object({
                token: z.string(),
            }),
        );
    }
}

export { RefreshTokenDto };
export type { RefreshTokenSerialized };
