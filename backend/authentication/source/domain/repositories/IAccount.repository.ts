import AccountEntity from "@source/domain/entities/Account.entity";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

type AccountCreate = Pick<AccountEntity, "email" | "password" | "phone">;
type AccountFilters = {
	All: Partial<Pick<AccountEntity, "id" | "email" | "phone">>;

	IdOnly: Required<Pick<AccountFilters["All"], "id">>;
	EmailOnly: Required<Pick<AccountFilters["All"], "email">>;
	PhoneOnly: Required<Pick<AccountFilters["All"], "phone">>;
};
type AccountUpdate = Partial<
	Omit<AccountEntity, "id" | "createdAt" | "updatedAt">
>;

interface IAccountRepository {
	Create(
		connection: DatabaseClient,
		profile: AccountCreate,
	): Promise<AccountEntity>;

	FindById(
		connection: DatabaseClient,
		filter: AccountFilters["IdOnly"],
	): Promise<AccountEntity | null>;

	FindByEmail(
		connection: DatabaseClient,
		filter: AccountFilters["EmailOnly"],
	): Promise<AccountEntity | null>;

	Update(
		connection: DatabaseClient,
		filter: AccountFilters["IdOnly"],
		update: AccountUpdate,
	): Promise<AccountEntity>;
}

export default IAccountRepository;
export type { AccountCreate, AccountFilters, AccountUpdate };
