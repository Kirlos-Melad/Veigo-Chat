function ConvertObjectToArrays(object: Record<string, Primitive | undefined>): {
	fields: string[];
	values: Primitive[];
} {
	const fields: string[] = [];
	const values: Primitive[] = [];

	Object.keys(object).forEach((key) => {
		if (object[key]) {
			fields.push(`"${key}"`);
			values.push(object[key] as Primitive);
		}
	});

	return { fields, values };
}

export default ConvertObjectToArrays;