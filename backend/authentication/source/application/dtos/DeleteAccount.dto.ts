import { z } from "zod";
import { Dto } from "@source/application/dtos/Dto";

type DeleteAccountSerialized = {};

class DeleteAccountDto extends Dto<DeleteAccountSerialized> {
    constructor(data: any) {
        super(data, z.object({}));
    }
}

export default DeleteAccountDto;
export type { DeleteAccountSerialized };
