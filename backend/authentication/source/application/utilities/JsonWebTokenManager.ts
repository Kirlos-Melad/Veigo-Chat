import * as jose from "jose";
import moment from "moment";
import crypto from "crypto";

type Configurations = {
    secretKey: string;
    algorithm: string;
    encryption: string;
    issuer: string;
    duration: {
        amount: number;
        unit:
            | "milliseconds"
            | "seconds"
            | "minutes"
            | "hours"
            | "days"
            | "weeks"
            | "months"
            | "years";
    };
};

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

class JsonWebTokenManager {
    private static _instance: JsonWebTokenManager;

    private _secretKeyObject: crypto.KeyObject;
    private _configurations: Omit<Configurations, "secretKey">;

    private constructor(configurations: Configurations) {
        this._secretKeyObject = crypto.createSecretKey(
            new TextEncoder().encode(configurations.secretKey),
        );

        this._configurations = configurations;
    }

    public static createInstance(configurations: Configurations): JsonWebTokenManager {
        this._instance = new JsonWebTokenManager(configurations);

        return JsonWebTokenManager._instance;
    }

    public static get instance(): JsonWebTokenManager {
        return JsonWebTokenManager._instance;
    }

    private stringifySubject(subject: Subject): string {
        return `${subject.accountId}:${subject.clientId}`;
    }

    private parseSubject(subject: string): Subject {
        const arr = subject.split(":");

        return { accountId: arr[0], clientId: arr[1] };
    }

    public normalizeSubject(subject: Subject): string {
        return this.stringifySubject(subject);
    }

    private async generate(payload: Payload): Promise<string> {
        const { algorithm, encryption, issuer, duration } =
            this._configurations;

        const { id, subject, audience } = payload;

        const now = moment();
        const jwe = new jose.EncryptJWT()
            .setProtectedHeader({ alg: algorithm, enc: encryption })
            .setJti(id)
            .setIssuer(issuer)
            .setIssuedAt(now.unix())
            .setNotBefore(now.unix())
            .setAudience(audience)
            .setSubject(this.stringifySubject(subject));

        if (payload.expires) {
            jwe.setExpirationTime(
                now.add(duration.amount, duration.unit).unix(),
            );
        }

        return await jwe.encrypt(this._secretKeyObject);
    }

    public async generateAccessToken(
        payload: Pick<Payload, "id" | "subject">,
    ): Promise<string> {
        return await this.generate({
            ...payload,
            audience: "any",
            expires: true,
        });
    }

    public async generateRefreshToken(
        payload: Pick<Payload, "id" | "subject">,
    ): Promise<string> {
        return await this.generate({
            ...payload,
            audience: "authentication",
        });
    }

    private async verify(
        jwt: string,
        audience: Payload["audience"],
    ): Promise<Pick<Payload, "id" | "subject">> {
        const { issuer } = this._configurations;

        const { payload } = await jose.jwtDecrypt(jwt, this._secretKeyObject, {
            issuer: issuer,
            audience: audience,
        });

        if (!payload.jti || !payload.sub) throw new Error("Invalid token");

        return {
            id: payload.jti,
            subject: this.parseSubject(payload.sub),
        };
    }

    public async verifyAccessToken(
        jwt: string,
    ): Promise<Pick<Payload, "id" | "subject">> {
        return await this.verify(jwt, "any");
    }
    public async verifyRefreshToken(
        jwt: string,
    ): Promise<Pick<Payload, "id" | "subject">> {
        return await this.verify(jwt, "authentication");
    }
}

export { JsonWebTokenManager };
