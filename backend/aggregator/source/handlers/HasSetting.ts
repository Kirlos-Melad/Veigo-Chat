import ConfigurationModel from "../models/Configuration.model";
import Logger from "../utilities/Logger";
import { ConfigurationSchema } from "./RequestBodySchema";

function GetNestedValue(obj: any, path: string) {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

async function HasConfiguration(
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

		const value = GetNestedValue(result.settings, setting.path);

		return JSON.stringify(setting.value) === JSON.stringify(value);
	} catch (error) {
		Logger.error(`[HasConfiguration] Error: `, error);
		return false;
	}
}

export default HasConfiguration;
