import { faker } from "@faker-js/faker";
import DeviceEntity from "@source/domain/entities/Device.entity";

export function DeviceFactory(
	overrides: Partial<DeviceEntity> = {},
): DeviceEntity {
	return {
		accountId: faker.string.uuid(),
		clientId: faker.string.uuid(),
		accessTokenId: faker.string.alphanumeric({ length: 32 }),
		refreshTokenId: faker.string.alphanumeric({ length: 32 }),
		forceRefreshToken: false,
		forceSignIn: false,
		createdAt: faker.date.recent().toString(),
		updatedAt: faker.date.recent().toString(),
		...overrides,
	};
}
