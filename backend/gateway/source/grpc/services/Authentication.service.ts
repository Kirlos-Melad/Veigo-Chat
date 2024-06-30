import Environments from "@source/configurations/Environments";
import GRPCServiceManager from "../GRPCServiceManager";
import { AuthenticationClient } from "@source/types/generated/protos/authentication/Authentication";

const PROTO_PATH = "source/types/generated/protos/definitions";

const AuthService = new GRPCServiceManager<{
	Authentication: AuthenticationClient;
}>(
	"Auth",
	{
		Authentication: `${PROTO_PATH}/authentication.proto`,
	},
	Environments.AUTH_SERVICE_CONNECTION,
	Environments.AUTH_SERVICE_CREDENTIALS,
);

export default AuthService;
