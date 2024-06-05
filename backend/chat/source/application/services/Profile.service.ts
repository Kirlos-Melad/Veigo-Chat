import { ProfileHandlers } from "@source/types/generated/protos/ProfilePackage/Profile";
import TransactionalCall from "../utilities/TransactionalCall";
import CreateProfileUseCase from "@source/domain/use-cases/profiles/Create.profile.usecase";
import ReadProfileUseCase from "@source/domain/use-cases/profiles/Read.profile.usecase";
import UpdateProfileUseCase from "@root/source/domain/use-cases/profiles/Update.profile.usecase";
import DeleteProfileUseCase from "@root/source/domain/use-cases/profiles/Delete.profile.usecase";

class ProfileService implements ProfileHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Create = TransactionalCall(
		CreateProfileUseCase.Serializer,
		CreateProfileUseCase.Authorize,
		CreateProfileUseCase.Handle,
	);
	Read = TransactionalCall(
		ReadProfileUseCase.Serializer,
		ReadProfileUseCase.Authorize,
		ReadProfileUseCase.Handle,
	);
	Update = TransactionalCall(
		UpdateProfileUseCase.Serializer,
		UpdateProfileUseCase.Authorize,
		UpdateProfileUseCase.Handle,
	);
	Delete = TransactionalCall(
		DeleteProfileUseCase.Serializer,
		DeleteProfileUseCase.Authorize,
		DeleteProfileUseCase.Handle,
	);
}

export default new ProfileService();
