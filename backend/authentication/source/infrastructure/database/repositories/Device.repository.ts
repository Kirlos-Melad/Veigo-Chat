import DeviceEntity from "@root/source/domain/entities/Device.entity";
import { DatabaseClient } from "../DatabaseManager";
import ConvertObjectToArrays from "@root/source/application/utilities/ConvertObjectToArrays";
import IDeviceRepository, {
	DeviceCreate,
	DeviceRead,
	DeviceUpdate,
} from "@root/source/domain/repositories/IDevice.repository";

class DeviceRepository implements IDeviceRepository {
	public async Create(connection: DatabaseClient, device: DeviceCreate) {
		const { fields, values } = ConvertObjectToArrays(device);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
				INSERT INTO devices
				(${fieldsString})
				VALUES(${valuesString})
				RETURNING *;
				`;
		return (await connection.Execute<DeviceEntity>(query, values)).rows[0];
	}

	public async Read(connection: DatabaseClient, filter: DeviceRead) {
		const query = `
			SELECT *
			FROM devices
			WHERE "accountId" = '${filter.accountId}'
			AND "clientId" = '${filter.clientId}';
		`;

		const result = await connection.Execute<DeviceEntity>(query);

		return result.rowCount ? result.rows[0] : undefined;
	}

	public async Update(
		connection: DatabaseClient,
		filter: DeviceRead,
		update: DeviceUpdate,
	) {
		const { fields, values } = ConvertObjectToArrays(update);

		if (!values.length) {
			const result = await this.Read(connection, filter);
			if (!result) throw new Error("Device not found");
			return result;
		}

		const setClause = fields
			.map((key, idx) => `"${key}" = $${idx + 1}`)
			.join(", ");

		const query = `
			UPDATE devices
			SET ${setClause}
			WHERE "accountId" = '${filter.accountId}'
			AND "clientId" = '${filter.clientId}'
			RETURNING *;
		`;

		return (await connection.Execute<DeviceEntity>(query, values)).rows[0];
	}

	public async Upsert(
		connection: DatabaseClient,
		filter: DeviceRead,
		update: DeviceUpdate,
	): Promise<DeviceEntity> {
		const readArrays = ConvertObjectToArrays(filter);
		const updateArrays = ConvertObjectToArrays(update);

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
			.map((key) => `"${key}" = EXCLUDED.${key}`)
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
			await connection.Execute<DeviceEntity>(query, createValuesArray)
		).rows[0];
	}
}

export default new DeviceRepository();
