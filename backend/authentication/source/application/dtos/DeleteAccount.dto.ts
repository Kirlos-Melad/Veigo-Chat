import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type DeleteAccountSerialized = object;

class DeleteAccountDto extends Dto<DeleteAccountSerialized> {
    public constructor() {
        super(z.object({}));
    }
}

export { DeleteAccountDto };
export type { DeleteAccountSerialized };
