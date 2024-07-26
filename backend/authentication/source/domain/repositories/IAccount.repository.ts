import { AccountEntity } from "@source/domain/entities/Account.entity";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

type AccountCreate = Pick<AccountEntity, "email" | "password" | "phone">;
type AccountFilters = {
    all: Partial<Pick<AccountEntity, "id" | "email" | "phone">>;

    idOnly: Required<Pick<AccountFilters["all"], "id">>;
    emailOnly: Required<Pick<AccountFilters["all"], "email">>;
    phoneOnly: Required<Pick<AccountFilters["all"], "phone">>;
};
type AccountUpdate = Partial<
    Omit<AccountEntity, "id" | "createdAt" | "updatedAt">
>;

interface IAccountRepository {
    create(
        connection: DatabaseClient,
        profile: AccountCreate,
    ): Promise<AccountEntity>;

    findById(
        connection: DatabaseClient,
        filter: AccountFilters["idOnly"],
    ): Promise<AccountEntity | null>;

    findByEmail(
        connection: DatabaseClient,
        filter: AccountFilters["emailOnly"],
    ): Promise<AccountEntity | null>;

    update(
        connection: DatabaseClient,
        filter: AccountFilters["idOnly"],
        update: AccountUpdate,
    ): Promise<AccountEntity>;
}

export type {
    IAccountRepository,
    AccountCreate,
    AccountFilters,
    AccountUpdate,
};
