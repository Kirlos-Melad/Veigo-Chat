import { DatabaseClient } from "@source/infrastructure/database/DatabaseManager";
import IProfileRepository from "@source/domain/repositories/IProfile.repository";
import {
	ProfileCreate,
	ProfileRead,
	ProfileUpdate,
} from "@source/application/dtos/profile";
import ProfileEntity from "@source/domain/entities/Profile.entity";
import ConvertObjectToArrays from "@source/application/utilities/ConvertObjectToArrays";

class ProfileRepository implements IProfileRepository {
	public async Create(
		connection: DatabaseClient,
		profile: ProfileCreate,
	): Promise<ProfileEntity> {
		const { fields, values } = ConvertObjectToArrays(profile);

		const fieldsString = fields.join(", ");
		const valuesString = values.map((_, idx) => `$${idx + 1}`).join(", ");

		const query = `
				INSERT INTO profiles
				(${fieldsString})
				VALUES(${valuesString})
				RETURNING *;
				`;
		return (await connection.Execute<ProfileEntity>(query, values)).rows[0];
	}

	public async Read(
		connection: DatabaseClient,
		filter: ProfileRead,
	): Promise<ProfileEntity> {
		const query = `
            SELECT *
            FROM profiles
            WHERE id = ${filter.id};
        `;

		return (await connection.Execute<ProfileEntity>(query)).rows[0];
	}

	public async Update(
		connection: DatabaseClient,
		filter: ProfileRead,
		update: ProfileUpdate,
	): Promise<ProfileEntity> {
		const { fields, values } = ConvertObjectToArrays(update);

		if (!values.length) return await this.Read(connection, filter);

		const setClause = fields
			.map((key, idx) => `"${key}" = $${idx + 1}`)
			.join(", ");

		const query = `
        UPDATE profiles
        SET ${setClause}
        WHERE id = '${filter.id}'
        RETURNING *;
    `;

		return (await connection.Execute<ProfileEntity>(query, values)).rows[0];
	}

	public async Delete(
		connection: DatabaseClient,
		filter: ProfileRead,
	): Promise<ProfileEntity> {
		const query = `
            DELETE FROM profiles
            WHERE id = ${filter.id}
            RETURNING *;
        `;

		return (await connection.Execute<ProfileEntity>(query)).rows[0];
	}
}

export default ProfileRepository;
