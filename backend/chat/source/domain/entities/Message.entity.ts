interface MessageEntity {
	id: string;

	roomId: string;
	senderId: string;
	content: string;

	createdAt: Date;
	updatedAt: Date;
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
		data.createdAt instanceof Date &&
		data.updatedAt instanceof Date
	);
}

export default MessageEntity;
export { IsMessageEntity };
