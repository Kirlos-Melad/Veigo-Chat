import AccountEntity from "@source/domain/entities/Account.entity";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";

type AccountCreate = { email: string; password: string; phone?: string };

interface IAccountRepository {
	Create(
		connection: DatabaseClient,
		profile: AccountCreate,
	): Promise<AccountEntity>;

	FindByEmail(
		connection: DatabaseClient,
		email: string,
	): Promise<AccountEntity | null>;
}

export default IAccountRepository;
export type { AccountCreate };
