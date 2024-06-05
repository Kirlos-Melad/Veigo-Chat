import { MessageHandlers } from "@source/types/generated/protos/MessagePackage/Message";
import TransactionalCall from "../utilities/TransactionalCall";
import CreateMessageUseCase from "@root/source/domain/use-cases/messages/Create.message.usecase";
import ReadMessageUseCase from "@root/source/domain/use-cases/messages/Read.message.usecase";
import UpdateMessageUseCase from "@root/source/domain/use-cases/messages/Update.message.usecase";
import DeleteMessageUseCase from "@root/source/domain/use-cases/messages/Delete.message.usecase";

class MessageService implements MessageHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Create = TransactionalCall(
		CreateMessageUseCase.Serializer,
		CreateMessageUseCase.Authorize,
		CreateMessageUseCase.Handle,
	);

	Read = TransactionalCall(
		ReadMessageUseCase.Serializer,
		ReadMessageUseCase.Authorize,
		ReadMessageUseCase.Handle,
	);

	Update = TransactionalCall(
		UpdateMessageUseCase.Serializer,
		UpdateMessageUseCase.Authorize,
		UpdateMessageUseCase.Handle,
	);

	Delete = TransactionalCall(
		DeleteMessageUseCase.Serializer,
		DeleteMessageUseCase.Authorize,
		DeleteMessageUseCase.Handle,
	);
}

export default new MessageService();
