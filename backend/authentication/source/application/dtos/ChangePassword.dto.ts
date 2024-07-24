import { z } from "zod";

import { Dto } from "@source/application/dtos/Dto";
import PasswordHandler from "@source/application/utilities/PasswordHandler";

type ChangePasswordSerialized = {
    oldPassword: string;
    newPassword: string;
};

class ChangePasswordDto extends Dto<ChangePasswordSerialized> {
    constructor(data: any) {
        super(
            data,
            z.object({
                oldPassword: PasswordHandler.schema,
                newPassword: PasswordHandler.schema.transform(
                    PasswordHandler.hash,
                ),
            }),
        );
    }
}

export default ChangePasswordDto;
export type { ChangePasswordSerialized };
