import AccountEntity from "@root/source/domain/entities/Account.entity";
import { DatabaseClient } from "../DatabaseManager";
import ConvertObjectToArrays from "@root/source/application/utilities/ConvertObjectToArrays";
import IAccountRepository, {
	AccountCreate,
} from "@root/source/domain/repositories/IAccount.repository";

class AccountRepository implements IAccountRepository {
	public async Create(connection: DatabaseClient, account: AccountCreate) {
		const { fields, values } = ConvertObjectToArrays(account);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
				INSERT INTO accounts
				(${fieldsString})
				VALUES(${valuesString})
				RETURNING *;
				`;
		return (await connection.Execute<AccountEntity>(query, values)).rows[0];
	}

	public async FindByEmail(connection: DatabaseClient, email: string) {
		const query = `
				SELECT * FROM accounts
				WHERE email = $1;
				`;
		const result = await connection.Execute<AccountEntity>(query, [email]);
		return result.rowCount ? result.rows[0] : null;
	}
}

export default new AccountRepository();
