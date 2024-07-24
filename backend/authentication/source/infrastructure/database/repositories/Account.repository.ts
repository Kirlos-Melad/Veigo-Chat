import AccountEntity from "@source/domain/entities/Account.entity";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";
import IAccountRepository, {
    AccountCreate,
    AccountFilters,
    AccountUpdate,
} from "@source/domain/repositories/IAccount.repository";

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

    public async FindById(
        connection: DatabaseClient,
        filter: AccountFilters["IdOnly"],
    ) {
        const query = `
				SELECT * FROM accounts
				WHERE id = $1;
				`;
        const result = await connection.Execute<AccountEntity>(query, [
            filter.id,
        ]);
        return result.rowCount ? result.rows[0] : null;
    }

    public async FindByEmail(
        connection: DatabaseClient,
        filter: AccountFilters["EmailOnly"],
    ) {
        const query = `
				SELECT * FROM accounts
				WHERE email = $1;
				`;
        const result = await connection.Execute<AccountEntity>(query, [
            filter.email,
        ]);
        return result.rowCount ? result.rows[0] : null;
    }

    public async Update(
        connection: DatabaseClient,
        filter: AccountFilters["IdOnly"],
        update: AccountUpdate,
    ) {
        const { fields, values } = ConvertObjectToArrays(update);

        const fieldsString = fields
            .map((field) => `${field} = $${field}`)
            .join(", ");

        const query = `
				UPDATE accounts
				SET ${fieldsString}
				WHERE id = $1
				RETURNING *;
				`;
        return (
            await connection.Execute<AccountEntity>(query, [
                filter.id,
                ...values,
            ])
        ).rows[0];
    }
}

export default new AccountRepository();
