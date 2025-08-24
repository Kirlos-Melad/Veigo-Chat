import { DeviceEntity } from "@source/domain/entities/Device.entity";
import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import { convertObjectToArrays } from "@source/application/utilities/ConvertObjectToArrays";
import {
    IDeviceRepository,
    DeviceCreate,
    DeviceRead,
    DevicesList,
    DeviceUpdate,
} from "@source/domain/repositories/IDevice.repository";

class DeviceRepository implements IDeviceRepository {
    public async create(
        connection: DatabaseClient,
        device: DeviceCreate,
    ): Promise<DeviceEntity> {
        const { fields, values } = convertObjectToArrays(device);

        const fieldsString = fields.join(", ");
        const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

        const query = `
				INSERT INTO devices
				(${fieldsString})
				VALUES(${valuesString})
				RETURNING *;
				`;
        return (await connection.execute<DeviceEntity>(query, values)).rows[0];
    }

    public async read(
        connection: DatabaseClient,
        filter: DeviceRead,
    ): Promise<DeviceEntity | undefined> {
        const query = `
			SELECT *
			FROM devices
			WHERE "accountId" = $1
			AND "clientId" = $2;
		`;

        const result = await connection.execute<DeviceEntity>(query, [
            filter.accountId,
            filter.clientId,
        ]);

        return result.rowCount ? result.rows[0] : undefined;
    }

    public async list(
        connection: DatabaseClient,
        filter: DevicesList,
    ): Promise<DeviceEntity[]> {
        const values: unknown[] = [filter.accountId];
        let query = `
			SELECT *
			FROM devices
			WHERE "accountId" = $1\n
		`;

        if (filter.from) {
            values.push(filter.from);
            query += `AND "clientId" > $${values.length}\n`;
        }

        values.push(filter.limit);
        query += `
			ORDER BY "clientId" ASC
			LIMIT $${values.length}\n
		`;

        const result = await connection.execute<DeviceEntity>(query, values);

        return result.rows;
    }

    public async update(
        connection: DatabaseClient,
        filter: DeviceRead,
        update: DeviceUpdate,
    ): Promise<DeviceEntity> {
        const { fields, values } = convertObjectToArrays(update);

        if (!values.length) {
            const result = await this.read(connection, filter);
            if (!result) throw new Error("Device not found");
            return result;
        }

        const setClause = fields
            .map((key, idx) => `${key} = $${idx + 1}`)
            .join(", ");

        const query = `
			UPDATE devices
			SET ${setClause}
			WHERE "accountId" = $${fields.length + 1}
			AND "clientId" = $${fields.length + 2}
			RETURNING *;
		`;

        return (
            await connection.execute<DeviceEntity>(query, [
                ...values,
                filter.accountId,
                filter.clientId,
            ])
        ).rows[0];
    }

    public async upsert(
        connection: DatabaseClient,
        filter: DeviceRead,
        update: DeviceUpdate,
    ): Promise<DeviceEntity> {
        const readArrays = convertObjectToArrays(filter);
        const updateArrays = convertObjectToArrays(update);

        const createFieldsArray = [
            ...readArrays.fields,
            ...updateArrays.fields,
        ];
        const createValuesArray = [
            ...readArrays.values,
            ...updateArrays.values,
        ];

        const createFieldsString = createFieldsArray.join(", ");
        const createValuesString = createValuesArray
            .map((_, idx) => `$${idx + 1}`)
            .join(", ");

        const setClause = updateArrays.fields
            .map((key) => `${key} = EXCLUDED.${key}`)
            .join(", ");

        const query = `
			INSERT INTO devices
			(${createFieldsString})
			VALUES(${createValuesString})
			ON CONFLICT ("accountId", "clientId")
			DO UPDATE SET
			${setClause}
			RETURNING *;
		`;

        return (
            await connection.execute<DeviceEntity>(query, createValuesArray)
        ).rows[0];
    }
}

export { DeviceRepository };
