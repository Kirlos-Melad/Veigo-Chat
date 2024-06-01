import MembershipModel from "../models/Membership.model";
import { MemberSchema } from "./RequestBodySchema";

async function IsMember(
	membership: typeof MemberSchema._output,
): Promise<boolean> {
	const result = await MembershipModel.exists({
		type: membership.type,
		resource: membership.resource,
		members: membership.user,
	}).lean().exec();

	return result ? true : false;
}

export default IsMember;
