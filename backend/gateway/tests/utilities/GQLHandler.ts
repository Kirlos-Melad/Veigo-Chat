import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import QueryBuilder from "gql-query-builder";
import Environments from "@source/configurations/Environments";
import { expect } from "chai";

const GQL_ENDPOINT = `http://localhost:${Environments.SERVICE_PORT}/gql`;

const Request = async (args: {
	headers?: AxiosRequestConfig["headers"];
	data: { query: string; variables?: any };
}) =>
	await axios({
		url: GQL_ENDPOINT,
		method: "POST",
		headers: args.headers,
		data: args.data,
	});

const AssertResponse = (args: {
	operationName: string;
	response: AxiosResponse<any, any>;
}) => {
	const { operationName, response } = args;
	expect(response).to.have.property("status").equal(200);
	const { data } = response;
	expect(data).to.not.have.property("errors");
	expect(data).to.have.property("data");
	expect(data.data).to.have.property(operationName);
	const signUpResponse = data.data[operationName];

	return signUpResponse;
};

export default { QueryBuilder, Request, AssertResponse };
