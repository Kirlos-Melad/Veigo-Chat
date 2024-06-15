import { ZodError } from "zod";
import pg from "pg";

const ERROR_NAME = {
	INTERNAL_SERVER_ERROR: "Internal Server Error",
};

const DB_ERROR_CODE = {
	SYNTAX_ERROR: "42601",
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
