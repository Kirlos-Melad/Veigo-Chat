import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z
    .string()
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        "The password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character and must be at least 8 characters long with no spaces",
    );

const hash = (value: string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(value, salt);
};

export default { schema, hash };
