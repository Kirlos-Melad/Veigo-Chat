import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Environments from "./configurations/Environments";
import RequestBodySchema from "./handlers/RequestBodySchema";
import HasConfiguration from "./handlers/HasSetting";
import IsMember from "./handlers/IsMember";
import IsOwner from "./handlers/IsOwner";
import Logger from "./utilities/Logger";

const app = express();

app.use(express.json());

await mongoose.connect(Environments.MONGODB_CONNECTION);

// Define a route to handle POST requests
app.post("/", async (request: Request, response: Response) => {
	const parseResult = RequestBodySchema.safeParse(request.body);

	if (!parseResult.success) {
		return response.status(400).json({
			error: "Invalid request body",
			details: parseResult.error.errors,
		});
	}

	response.status(200).json({
		owner: false,
		member: false,
		configuration: false,
	});

	const { ownership, membership, configuration } = parseResult.data;

	try {
		const results = await Promise.all([
			ownership ? IsOwner(ownership) : false,
			membership ? IsMember(membership) : false,
			configuration ? HasConfiguration(configuration) : false,
		]);

		response.status(200).json({
			owner: results[0],
			member: results[1],
			configuration: results[2],
		});
	} catch (error: any) {
		response.status(500).json({ error: error.message });
	}
});

app.listen(Environments.SERVICE_PORT, () => {
	Logger.information(
		`Server is listening on port ${Environments.SERVICE_PORT}`,
	);
});
