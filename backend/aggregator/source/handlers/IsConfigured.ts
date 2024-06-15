import ConfigurationModel from "../models/Configuration.model";
import DeepEqual from "../utilities/DeepEqual";
import Logger from "../utilities/Logger";
import { ConfigurationSchema } from "./RequestBodySchema";

function GetNestedValue(obj: any, path: string) {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

async function IsConfigured(
	setting: typeof ConfigurationSchema._output,
): Promise<boolean> {
	try {
		const result = await ConfigurationModel.findOne({
			type: setting.type,
			resource: setting.resource,
		})
			.lean()
			.exec();

		if (!result) {
			return false;
		}

		return DeepEqual(
			setting.value,
			GetNestedValue(result.settings, setting.path),
		);
	} catch (error) {
		Logger.error(`[IsConfigured] Error: `, error);
		return false;
	}
}

export default IsConfigured;
