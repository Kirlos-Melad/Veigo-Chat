import OwnershipModel from "../models/Ownership.model";
import Logger from "../utilities/Logger";
import { OwnerSchema } from "./RequestBodySchema";

async function IsOwner(
	ownership: typeof OwnerSchema._output,
): Promise<boolean> {
	try {
		const result = await OwnershipModel.exists({
			type: ownership.type,
			resource: ownership.resource,
			owner: ownership.user,
		})
			.lean()
			.exec();

		return result ? true : false;
	} catch (error) {
		Logger.error(`[IsOwner] Error: `, error);
		return false;
	}
}

export default IsOwner;
