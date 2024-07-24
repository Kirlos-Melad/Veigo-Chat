import { faker } from "@faker-js/faker";
import AccountEntity from "@source/domain/entities/Account.entity";

export function AccountFactory(
    overrides: Partial<AccountEntity> = {},
): AccountEntity {
    return {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        password: "Password@123",
        isEmailVerified: false,
        phone: faker.phone.number(),
        isPhoneVerified: false,
        createdAt: faker.date.recent().toString(),
        updatedAt: faker.date.recent().toString(),
        ...overrides,
    };
}
