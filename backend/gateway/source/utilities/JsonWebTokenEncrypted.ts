import CryptoJS from "crypto-js";
import JsonWebToken from "jsonwebtoken";

class JsonWebTokenEncrypted {
	private static sInstance: JsonWebTokenEncrypted;

	private mTokenSecretKey: string;
	private mEncryptionSecretKey: string;

	private constructor(tokenSecretKey: string, encryptionSecretKey: string) {
		this.mTokenSecretKey = tokenSecretKey;
		this.mEncryptionSecretKey = encryptionSecretKey;

		JsonWebTokenEncrypted.sInstance = this;
	}

	public static CreateInstance(
		tokenSecretKey: string,
		encryptionSecretKey: string,
	): JsonWebTokenEncrypted {
		if (JsonWebTokenEncrypted.sInstance)
			JsonWebTokenEncrypted.sInstance;

		return new JsonWebTokenEncrypted(tokenSecretKey, encryptionSecretKey);
	}

	public static get instance(): JsonWebTokenEncrypted {
		if (!this.sInstance)
			throw new Error("Instance not created");

		return this.sInstance;
	}

	private CreateJWT(
		data: { accountId: string; deviceId: string; tokenId: string },
		options?: any,
	): string {
		// Base64 encoded object
		return JsonWebToken.sign({ ...data }, this.mTokenSecretKey, options);
	}

	private EncryptToken(jwt: string): string {
		// AES encrypted string
		return CryptoJS.AES.encrypt(jwt, this.mEncryptionSecretKey).toString();
	}

	/**
	 *
	 * @param data data object -- NOTE: token_uuid is reserved
	 * @returns
	 */
	public Create(
		data: { accountId: string; deviceId: string; tokenId: string },
		options?: JsonWebToken.SignOptions,
	): string {
		const jwt = this.CreateJWT(data, options);

		const JsonW = this.EncryptToken(jwt);

		return JsonW;
	}

	private DecryptToken(JsonW: string): string {
		const bytes = CryptoJS.AES.decrypt(JsonW, this.mEncryptionSecretKey);
		return bytes.toString(CryptoJS.enc.Utf8);
	}

	private VerifyJWT(jwt: string): any {
		return JsonWebToken.verify(jwt, this.mTokenSecretKey);
	}

	public Verify(token: string): {
		accountId: string;
		deviceId: string;
		tokenId: string;
	} {
		const jwt = this.DecryptToken(token);

		const decoded_jwt = this.VerifyJWT(jwt);

		return decoded_jwt;
	}
}

export default JsonWebTokenEncrypted;
