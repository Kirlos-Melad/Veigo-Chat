import Environments from "@source/configurations/Environments";
import GRPCServiceManager from "../GRPCServiceManager";
import { AuthenticationClient } from "@root/source/types/generated/protos/authentication/AuthenticationPackage/Authentication";

const AuthService = new GRPCServiceManager<{
	Authentication: AuthenticationClient;
}>(
	"Auth",
	{
		Authentication:
			"source/types/generated/protos/authentication/definitions/Authentication.proto",
	},
	Environments.AUTH_SERVICE_CONNECTION,
	Environments.AUTH_SERVICE_CREDENTIALS,
);

export default AuthService;
