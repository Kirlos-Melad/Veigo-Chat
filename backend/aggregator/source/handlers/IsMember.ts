import MembershipModel from "../models/Membership.model";
import Logger from "../utilities/Logger";
import { MemberSchema } from "./RequestBodySchema";

async function IsMember(
	membership: typeof MemberSchema._output,
): Promise<boolean> {
	try {
		const result = await MembershipModel.exists({
			type: membership.type,
			resource: membership.resource,
			members: membership.user,
		})
			.lean()
			.exec();

		return result ? true : false;
	} catch (error) {
		Logger.error(`[IsMember] Error: `, error);
		return false;
	}
}

export default IsMember;
