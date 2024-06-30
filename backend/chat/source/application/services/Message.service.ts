import { MessageHandlers } from "@source/types/generated/protos/message/Message";
import TransactionalCall from "../utilities/TransactionalCall";
import CreateMessageUseCase from "@source/domain/use-cases/messages/Create.message.usecase";
import ListMessageUseCase from "@source/domain/use-cases/messages/List.message.usecase";
import UpdateMessageUseCase from "@source/domain/use-cases/messages/Update.message.usecase";
import DeleteMessageUseCase from "@source/domain/use-cases/messages/Delete.message.usecase";

class MessageService implements MessageHandlers {
	[name: string]: import("@grpc/grpc-js").UntypedHandleCall;

	Create = TransactionalCall(
		CreateMessageUseCase.Serializer,
		CreateMessageUseCase.Authorize,
		CreateMessageUseCase.Handle,
	);

	List = TransactionalCall(
		ListMessageUseCase.Serializer,
		ListMessageUseCase.Authorize,
		ListMessageUseCase.Handle,
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
