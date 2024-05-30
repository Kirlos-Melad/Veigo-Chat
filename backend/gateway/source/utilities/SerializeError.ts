import { ZodError } from "zod";

class ErrorSerializer {
	private mError: any;
	private mSerializedError?: Record<string, any>;

	public constructor(error: any) {
		this.mError = error;
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
		if (this.mError instanceof ZodError) {
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
