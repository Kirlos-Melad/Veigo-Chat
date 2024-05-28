import Environments from "@root/source/configurations/Environments";
import * as jose from "jose";
import moment from "moment";

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
	private CreateSubject(subject: Subject) {
		return `${subject.accountId}:${subject.clientId}`;
	}

	private async Generate(payload: Payload) {
		const { algorithm, encryption, secret, issuer, duration } =
			Environments.JWT_CONFIGURATION;
		const encodedSecret = jose.base64url.decode(secret);
		const { id, subject, audience } = payload;

		const now = moment();
		const jwe = new jose.EncryptJWT()
			.setProtectedHeader({ alg: algorithm, enc: encryption })
			.setJti(id)
			.setIssuer(issuer)
			.setIssuedAt(now.unix())
			.setNotBefore(now.unix())
			.setAudience(audience)
			.setSubject(this.CreateSubject(subject));

		if (payload.expires) {
			jwe.setExpirationTime(
				now.add(duration.amount, duration.unit).unix(),
			);
		}

		return await jwe.encrypt(encodedSecret);
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
		const encodedSecret = jose.base64url.decode(secret);

		return await jose.jwtDecrypt(jwt, encodedSecret, {
			issuer: issuer,
			subject: audience,
		});
	}

	public async VerifyAccessToken(jwt: string) {
		return await this.Verify(jwt, "any");
	}
	public async VerifyRefreshToken(jwt: string) {
		return await this.Verify(jwt, "authentication");
	}
}

export default new JsonWebToken();
