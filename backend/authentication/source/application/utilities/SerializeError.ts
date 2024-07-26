import { ZodError } from "zod";
import pg from "pg";
import { Logger } from "@source/application/utilities/Logger";

const logger = Logger.instance;

const ERROR = {
    INTERNAL_SERVER_ERROR: {
        name: "Internal Server Error",
        message: "An internal error occurred. Please try again later.",
    },
    DATA_INTEGRITY_ERROR: {
        name: "Data Integrity Error",
    },
} as const;

const DB_ERROR_CODE = {
    SYNTAX_ERROR: "42601",
    FOREIGN_KEY_VIOLATION: "23503",
    DATA_ALREADY_EXISTS: "23505",
} as const;

class ErrorSerializer {
    private databaseErrorInstanceSerializer(
        error: unknown,
    ): Record<string, unknown> {
        const dbError = error as pg.DatabaseError;

        if (dbError.code === DB_ERROR_CODE.SYNTAX_ERROR) {
            return ERROR.INTERNAL_SERVER_ERROR;
        } else if (dbError.code === DB_ERROR_CODE.FOREIGN_KEY_VIOLATION) {
            return {
                name: ERROR.DATA_INTEGRITY_ERROR.name,
                message:
                    "A data integrity error occurred. Please make sure the data is correct and try again.",
            };
        } else if (dbError.code === DB_ERROR_CODE.DATA_ALREADY_EXISTS) {
            return {
                name: ERROR.DATA_INTEGRITY_ERROR.name,
                message: "The data you are trying to add already exists.",
            };
        }
        // TODO: Implement serialization for DatabaseError
        return ERROR.INTERNAL_SERVER_ERROR;
    }

    private zodErrorInstanceSerializer(
        error: unknown,
    ): Record<string, unknown> {
        const zError = error as ZodError;
        return zError.flatten();
    }

    private generalErrorInstanceSerializer(
        error: unknown,
    ): Record<string, unknown> {
        const gError = error as Error;
        return {
            name: gError.name,
            message: gError.message,
            cause: gError.cause,
        };
    }

    public serialize(error: unknown): Record<string, unknown> | undefined {
        if (error instanceof pg.DatabaseError) {
            return this.databaseErrorInstanceSerializer(error);
        } else if (error instanceof ZodError) {
            return this.zodErrorInstanceSerializer(error);
        } else if (error instanceof Error) {
            return this.generalErrorInstanceSerializer(error);
        } else {
            logger.error("Unable to serialize error", error);
            return ERROR.INTERNAL_SERVER_ERROR;
        }
    }
}

export { ErrorSerializer };
