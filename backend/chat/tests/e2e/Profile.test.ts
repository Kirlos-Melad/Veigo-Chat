import { expect } from "chai";
import { createSandbox, SinonSandbox } from "sinon";
import { faker } from "@faker-js/faker";

import * as Application from "@source/index";
import CreateGrpcClient from "./utilities/CreateGrpcClient";
import { ProfileClient } from "@source/types/generated/protos/profile/Profile";
import JsonWebToken from "@source/application/utilities/JsonWebToken";
import { Metadata } from "@grpc/grpc-js";

describe("Profile Service Test", () => {
	let client: ProfileClient;
	const User: {
		id: string;
		clientId: string;
		profile: {
			photoPath: string;
			name: string;
			about: string;
		};
	} = {
		id: faker.string.uuid(),
		clientId: faker.string.uuid(),
		profile: {
			photoPath: faker.image.avatar(),
			name: faker.person.fullName(),
			about: faker.person.bio(),
		},
	};

	let app: Awaited<ReturnType<(typeof Application)["Start"]>>;

	before(async () => {
		const app = await Application.Start(9999);
		Sinon.stub(app.Authorization, "GetUserId").returns(
			new Promise((resolve) => resolve(User.id)),
		);
		Sinon.stub(JsonWebToken, "Verify").returns(
			new Promise((_, resolve) =>
				resolve({
					id: User.id,
					clientId: User.clientId,
				}),
			),
		);

		client = CreateGrpcClient<ProfileClient>(
			"source/types/generated/protos/definitions/profile.proto",
			"profile",
			"Profile",
		);

		await new Promise((reject, resolve) =>
			client.waitForReady(Date.now() + 1000, (error) =>
				error ? reject(error) : resolve(),
			),
		);
	});

	after(async () => {
		client.close();
		Sinon.restore();
		await app.Server.Stop();
	});

	it("Should create a profile successfully", async (done) => {
		const metadata = new Metadata();
		metadata.set("token", "");

		client.Create(User.profile, metadata, (error, response) => {
			expect(error).to.be.null;
			expect(response).not.to.be.undefined;

			expect(response).to.have.property("id").equal(User.id);
			expect(response)
				.to.have.property("photoPath")
				.equal(User.profile.photoPath);
			expect(response).to.have.property("name").equal(User.profile.name);
			expect(response)
				.to.have.property("about")
				.equal(User.profile.about);

			done();
		});
	});

	it("Should read a profile successfully", async (done) => {
		client.Read(
			{
				id: User.id,
			},
			(error, response) => {
				expect(error).to.be.null;
				expect(response).not.to.be.undefined;

				expect(response).to.have.property("id").equal(User.id);
				expect(response)
					.to.have.property("photoPath")
					.equal(User.profile.photoPath);
				expect(response)
					.to.have.property("name")
					.equal(User.profile.name);
				expect(response)
					.to.have.property("about")
					.equal(User.profile.about);

				done();
			},
		);
	});

	it("Should refresh token successfully", async (done) => {
		const nwAbout = faker.person.bio();

		client.Update({ id: User.id, about: nwAbout }, (error, response) => {
			expect(error).to.be.null;
			expect(response).not.to.be.undefined;

			expect(response).to.have.property("id").equal(User.id);
			expect(response)
				.to.have.property("photoPath")
				.equal(User.profile.photoPath);
			expect(response).to.have.property("name").equal(User.profile.name);
			expect(response).to.have.property("about").equal(nwAbout);

			User.profile.about = nwAbout;

			done();
		});
	});

	it("Should delete a profile successfully", async (done) => {
		client.Delete(
			{
				id: User.id,
			},
			(error, response) => {
				expect(error).to.be.null;
				expect(response).not.to.be.undefined;

				expect(response).to.have.property("id").equal(User.id);
				expect(response)
					.to.have.property("photoPath")
					.equal(User.profile.photoPath);
				expect(response)
					.to.have.property("name")
					.equal(User.profile.name);
				expect(response)
					.to.have.property("about")
					.equal(User.profile.about);

				done();
			},
		);
	});
});
