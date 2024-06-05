import Environments from "@root/source/configurations/Environments";
import * as jose from "jose";
import crypto from "crypto";

type Subject = {
	accountId: string;
	clientId: string;
};

class JsonWebToken {
	private ParseSubject(subject?: string): Subject | undefined {
		const arr = subject?.split(":");
		if (!arr) return undefined;

		return { accountId: arr[0], clientId: arr[1] };
	}

	public async Verify(jwt: string) {
		const secretKeyObject = crypto.createSecretKey(
			new TextEncoder().encode(Environments.JWT_SECRET_KEY),
		);

		const { payload } = await jose.jwtDecrypt(jwt, secretKeyObject, {
			issuer: Environments.JWT_ISSUER,
			audience: "any",
		});

		return {
			id: payload.jti,
			subject: this.ParseSubject(payload.sub),
		};
	}
}

export default new JsonWebToken();
