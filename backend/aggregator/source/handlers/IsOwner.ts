import OwnershipModel from "../models/Ownership.model";
import { OwnerSchema } from "./RequestBodySchema";

async function IsOwner(ownership: typeof OwnerSchema._output): Promise<boolean> {
	const result = await OwnershipModel.exists({
		type: ownership.type,
		resource: ownership.resource,
		owner: ownership.user,
	}).lean().exec();

	return result ? true : false;
}

export default IsOwner;
