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
		if (setting.paths.length !== setting.values.length) return false;

		const result = await ConfigurationModel.findOne({
			type: setting.type,
			resource: setting.resource,
		})
			.lean()
			.exec();

		if (!result) {
			return false;
		}

		return setting.paths.every((path, index) =>{
			const value = GetNestedValue(result.settings, path);
			return DeepEqual(value, setting.values[index]);
		})
	} catch (error) {
		Logger.error(`[IsConfigured] Error: `, error);
		return false;
	}
}

export default IsConfigured;
