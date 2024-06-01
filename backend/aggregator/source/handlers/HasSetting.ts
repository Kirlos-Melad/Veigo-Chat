import ConfigurationModel from "../models/Configuration.model";
import { ConfigurationSchema } from "./RequestBodySchema";

function GetNestedValue(obj: any, path: string) {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

async function HasConfiguration(
	setting: typeof ConfigurationSchema._output,
): Promise<boolean> {
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
}

export default HasConfiguration;
