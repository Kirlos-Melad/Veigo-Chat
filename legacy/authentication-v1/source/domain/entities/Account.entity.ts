interface AccountEntity {
    id: string;

    email: string;
    isEmailVerified: boolean;

    password?: string;

    phone?: string;
    isPhoneVerified: boolean;

    createdAt: string;
    updatedAt: string;
}

function isAccountEntity(data: unknown): data is AccountEntity {
    if (typeof data != "object" || data == null || Array.isArray(data))
        return false;

    const checker = data as AccountEntity;

    return (
        typeof checker.id === "string" &&
        typeof checker.email === "string" &&
        typeof checker.isEmailVerified === "boolean" &&
        (checker.password === undefined ||
            typeof checker.password === "string") &&
        (checker.phone === undefined || typeof checker.phone === "string") &&
        typeof checker.isPhoneVerified === "boolean" &&
        typeof checker.createdAt === "string" &&
        typeof checker.updatedAt === "string"
    );
}

export type { AccountEntity };
export { isAccountEntity };
