import ConfigurationModel from "../models/Configuration.model";
import Logger from "../utilities/Logger";
import { ConfigurationSchema } from "./RequestBodySchema";

function GetNestedValue(obj: any, path: string) {
	return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function DeepEqual(a: any, b: any): boolean {
	// Check for strict equality first
	if (a === b) return true;

	// Check for null or undefined
	if (a == null || b == null) return false;

	// Check for arrays
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) {
			if (!DeepEqual(a[i], b[i])) return false;
		}
		return true;
	}

	// Check for objects
	if (typeof a === "object" && typeof b === "object") {
		let keysA = Object.keys(a);
		let keysB = Object.keys(b);

		if (keysA.length !== keysB.length) return false;

		for (let key of keysA) {
			if (!DeepEqual(a[key], b[key])) return false;
		}
		return true;
	}

	// If none of the above, they are not equal
	return false;
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

		return DeepEqual(
			setting.value,
			GetNestedValue(result.settings, setting.path),
		);
	} catch (error) {
		Logger.error(`[HasConfiguration] Error: `, error);
		return false;
	}
}

export default HasConfiguration;
