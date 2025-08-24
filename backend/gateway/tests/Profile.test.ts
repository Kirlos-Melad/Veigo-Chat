// This test depends on Login test success
import "./authentication/Login.test";

import { describe } from "mocha";
import { expect } from "chai";
import { faker } from "@faker-js/faker";

import GQLHandler from "./utilities/GQLHandler";
import context from "./utilities/context";
import { AxiosRequestConfig } from "axios";

describe("Test Profile Actions", () => {
	const headers: AxiosRequestConfig["headers"] = {
		Authorization: `SuperDuperUser ${context.User.token!.access}`,
	};

	before(() => {
		context.User.profile = {
			photoPath: faker.image.avatar(),
			name: faker.person.fullName(),
			about: faker.person.bio(),
		};
	});

	it("Should create profile successfully", async () => {
		const operationName = "CreateProfile";

		const createProfileQuery = GQLHandler.QueryBuilder.mutation({
			operation: operationName,
			variables: {
				photoPath: { value: context.User.profile!.photoPath },
				name: { value: context.User.profile!.name, required: true },
				about: { value: context.User.profile!.about },
			},
			fields: ["id", "photoPath", "name", "about"],
		});

		const response = await GQLHandler.Request({
			headers,
			data: createProfileQuery,
		});
		const createProfileResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		expect(createProfileResponse)
			.to.have.property("id")
			.equal(context.User.id!);
		expect(createProfileResponse)
			.to.have.property("photoPath")
			.equal(context.User.profile!.photoPath);
		expect(createProfileResponse)
			.to.have.property("name")
			.equal(context.User.profile!.name);
		expect(createProfileResponse)
			.to.have.property("about")
			.equal(context.User.profile!.about);
	});

	it("Should read profile successfully", async () => {
		const operationName = "ReadProfile";

		const readProfileQuery = GQLHandler.QueryBuilder.query({
			operation: operationName,
			variables: {
				id: { value: context.User.id!, required: true },
			},
			fields: ["id", "photoPath", "name", "about"],
		});

		const response = await GQLHandler.Request({
			headers,
			data: readProfileQuery,
		});
		const readProfileResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		expect(readProfileResponse)
			.to.have.property("id")
			.equal(context.User.id!);
		expect(readProfileResponse)
			.to.have.property("photoPath")
			.equal(context.User.profile!.photoPath);
		expect(readProfileResponse)
			.to.have.property("name")
			.equal(context.User.profile!.name);
		expect(readProfileResponse)
			.to.have.property("about")
			.equal(context.User.profile!.about);
	});

	it("Should update profile successfully", async () => {
		const operationName = "UpdateProfile";

		const updatedAbout = faker.person.bio();

		const updateProfileQuery = GQLHandler.QueryBuilder.mutation({
			operation: operationName,
			variables: {
				id: { value: context.User.id!, required: true },
				about: { value: updatedAbout },
			},
			fields: ["id", "photoPath", "name", "about"],
		});

		const response = await GQLHandler.Request({
			headers,
			data: updateProfileQuery,
		});
		const updateProfileResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		expect(updateProfileResponse)
			.to.have.property("id")
			.equal(context.User.id!);
		expect(updateProfileResponse)
			.to.have.property("photoPath")
			.equal(context.User.profile!.photoPath);
		expect(updateProfileResponse)
			.to.have.property("name")
			.equal(context.User.profile!.name);
		expect(updateProfileResponse)
			.to.have.property("about")
			.equal(updatedAbout);

		context.User.profile!.about = updatedAbout;
	});

	it("Should delete profile successfully", async () => {
		const operationName = "DeleteProfile";

		const deleteProfileQuery = GQLHandler.QueryBuilder.mutation({
			operation: operationName,
			variables: {
				id: { value: context.User.id!, required: true },
			},
			fields: ["id"],
		});

		const response = await GQLHandler.Request({
			headers,
			data: deleteProfileQuery,
		});
		const deleteProfileResponse = GQLHandler.AssertResponse({
			operationName,
			response,
		});

		expect(deleteProfileResponse)
			.to.have.property("id")
			.equal(context.User.id!);
	});
});
