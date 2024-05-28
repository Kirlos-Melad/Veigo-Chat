import Environments from "@root/source/configurations/Environments";
import * as jose from "jose";
import moment from "moment";
import crypto from "crypto";

type Audience = "any" | "authentication";

type Subject = {
	accountId: string;
	clientId: string;
};

type Payload = {
	id: string;
	subject: Subject;
	audience: Audience;
	expires?: boolean;
};

class JsonWebToken {
	private StringifySubject(subject: Subject) {
		return `${subject.accountId}:${subject.clientId}`;
	}

	private ParseSubject(subject?: string): Subject | undefined {
		const arr = subject?.split(":");
		if (!arr) return undefined;

		return { accountId: arr[0], clientId: arr[1] };
	}

	private async Generate(payload: Payload) {
		const { algorithm, encryption, secret, issuer, duration } =
			Environments.JWT_CONFIGURATION;
		const secretKeyObject = crypto.createSecretKey(
			new TextEncoder().encode(secret),
		);

		const { id, subject, audience } = payload;

		const now = moment();
		const jwe = new jose.EncryptJWT()
			.setProtectedHeader({ alg: algorithm, enc: encryption })
			.setJti(id)
			.setIssuer(issuer)
			.setIssuedAt(now.unix())
			.setNotBefore(now.unix())
			.setAudience(audience)
			.setSubject(this.StringifySubject(subject));

		if (payload.expires) {
			jwe.setExpirationTime(
				now.add(duration.amount, duration.unit).unix(),
			);
		}

		return await jwe.encrypt(secretKeyObject);
	}

	public async GenerateAccessToken(payload: Pick<Payload, "id" | "subject">) {
		return await this.Generate({
			...payload,
			audience: "any",
			expires: true,
		});
	}

	public async GenerateRefreshToken(
		payload: Pick<Payload, "id" | "subject">,
	) {
		return await this.Generate({
			...payload,
			audience: "authentication",
		});
	}

	private async Verify(jwt: string, audience: Payload["audience"]) {
		const { secret, issuer } = Environments.JWT_CONFIGURATION;
		const secretKeyObject = crypto.createSecretKey(
			new TextEncoder().encode(secret),
		);

		const { payload } = await jose.jwtDecrypt(jwt, secretKeyObject, {
			issuer: issuer,
			subject: audience,
		});

		return {
			id: payload.jti,
			subject: this.ParseSubject(payload.sub),
		}
	}

	public async VerifyAccessToken(jwt: string) {
		return await this.Verify(jwt, "any");
	}
	public async VerifyRefreshToken(jwt: string) {
		return await this.Verify(jwt, "authentication");
	}
}

export default new JsonWebToken();
