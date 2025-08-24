import { AccountEntity } from "@source/domain/entities/Account.entity";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { convertObjectToArrays } from "@source/application/utilities/ConvertObjectToArrays";
import {
    IAccountRepository,
    AccountCreate,
    AccountFilters,
    AccountUpdate,
} from "@source/domain/repositories/IAccount.repository";

class AccountRepository implements IAccountRepository {
    public async create(
        connection: DatabaseClient,
        account: AccountCreate,
    ): Promise<AccountEntity> {
        const { fields, values } = convertObjectToArrays(account);

        const fieldsString = fields.join(", ");
        const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

        const query = `
				INSERT INTO accounts
				(${fieldsString})
				VALUES(${valuesString})
				RETURNING *;
				`;
        return (await connection.execute<AccountEntity>(query, values)).rows[0];
    }

    public async findById(
        connection: DatabaseClient,
        filter: AccountFilters["idOnly"],
    ): Promise<AccountEntity | null> {
        const query = `
				SELECT * FROM accounts
				WHERE id = $1;
				`;
        const result = await connection.execute<AccountEntity>(query, [
            filter.id,
        ]);
        return result.rowCount ? result.rows[0] : null;
    }

    public async findByEmail(
        connection: DatabaseClient,
        filter: AccountFilters["emailOnly"],
    ): Promise<AccountEntity | null> {
        const query = `
				SELECT * FROM accounts
				WHERE email = $1;
				`;
        const result = await connection.execute<AccountEntity>(query, [
            filter.email,
        ]);
        return result.rowCount ? result.rows[0] : null;
    }

    public async update(
        connection: DatabaseClient,
        filter: AccountFilters["idOnly"],
        update: AccountUpdate,
    ): Promise<AccountEntity> {
        const { fields, values } = convertObjectToArrays(update);

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
            await connection.execute<AccountEntity>(query, [
                filter.id,
                ...values,
            ])
        ).rows[0];
    }
}

export { AccountRepository };
