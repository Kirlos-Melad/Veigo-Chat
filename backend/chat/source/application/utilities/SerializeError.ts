import { ZodError } from "zod";
import pg from "pg";

const ERROR_NAME = {
	INTERNAL_SERVER_ERROR: "Internal Server Error",
	DATA_INTEGRITY_ERROR: "Data Integrity Error",
};

const DB_ERROR_CODE = {
	SYNTAX_ERROR: "42601",
	FOREIGN_KEY_VIOLATION: "23503",
	DATA_ALREADY_EXISTS: "23505",
};

class ErrorSerializer {
	private mError: any;
	private mSerializedError?: Record<string, any>;

	public constructor(error: any) {
		this.mError = error;
	}

	private DatabaseErrorInstanceSerializer(): Record<string, any> {
		const error = this.mError as pg.DatabaseError;

		if (error.code === DB_ERROR_CODE.SYNTAX_ERROR) {
			return {
				name: ERROR_NAME.INTERNAL_SERVER_ERROR,
				message: "An internal error occurred. Please try again later.",
			};
		} else if (error.code === DB_ERROR_CODE.FOREIGN_KEY_VIOLATION) {
			return {
				name: ERROR_NAME.DATA_INTEGRITY_ERROR,
				message:
					"A data integrity error occurred. Please make sure the data is correct and try again.",
			};
		} else if(error.code === DB_ERROR_CODE.DATA_ALREADY_EXISTS) {
			return {
				name: ERROR_NAME.DATA_INTEGRITY_ERROR,
				message: "The data you are trying to add already exists.",
			};
		}
		// TODO: Implement serialization for DatabaseError
		return error;
	}

	private ZodErrorInstanceSerializer(): Record<string, any> {
		const error = this.mError as ZodError;
		return error.flatten();
	}

	private ErrorInstanceSerializer(): Record<string, any> {
		const error = this.mError as Error;
		return {
			name: error.name,
			message: error.message,
			cause: error.cause,
		};
	}

	public Serialize(): void {
		if (this.mError instanceof pg.DatabaseError) {
			this.mSerializedError = this.DatabaseErrorInstanceSerializer();
		} else if (this.mError instanceof ZodError) {
			this.mSerializedError = this.ZodErrorInstanceSerializer();
		} else if (this.mError instanceof Error) {
			this.mSerializedError = this.ErrorInstanceSerializer();
		} else {
			throw new Error("Unable to serialize error");
		}
	}

	public get serializedError(): Record<string, any> | undefined {
		return this.mSerializedError;
	}
}

export default ErrorSerializer;
