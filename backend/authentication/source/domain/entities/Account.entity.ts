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

function IsAccountEntity(data: any): data is AccountEntity {
    return (
        data &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        typeof data.id === "string" &&
        typeof data.email === "string" &&
        typeof data.isEmailVerified === "boolean" &&
        typeof data.password === "string" &&
        typeof data.phone === "string" &&
        typeof data.isPhoneVerified === "boolean" &&
        typeof data.createdAt === "string" &&
        typeof data.updatedAt === "string"
    );
}

export default AccountEntity;
export { IsAccountEntity };
