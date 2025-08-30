interface MessageEntity {
	id: string;

	roomId: string;
	senderId: string;
	content: string;

	createdAt: string;
	updatedAt: string;
}

function IsMessageEntity(data: any): data is MessageEntity {
	return (
		data &&
		typeof data === "object" &&
		!Array.isArray(data) &&
		typeof data.id === "string" &&
		typeof data.roomId === "string" &&
		typeof data.senderId === "string" &&
		typeof data.content === "string" &&
		typeof data.createdAt === "string" &&
		typeof data.updatedAt === "string"
	);
}

export default MessageEntity;
export { IsMessageEntity };
