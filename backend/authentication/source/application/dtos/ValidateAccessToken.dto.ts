import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type ValidateAccessTokenSerialized = { token: string };

class ValidateAccessTokenDto extends Dto<ValidateAccessTokenSerialized> {
    public constructor() {
        super(
            z.object({
                token: z.string(),
            }),
        );
    }
}

export { ValidateAccessTokenDto };
export type { ValidateAccessTokenSerialized };
