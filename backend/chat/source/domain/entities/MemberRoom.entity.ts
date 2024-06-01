interface MemberRoomEntity {
	memberId: string;
	roomId: string;

	createdAt: string;
	updatedAt: string;
}

function IsMemberRoomEntity(data: any): data is MemberRoomEntity {
	return (
		data &&
		typeof data === "object" &&
		!Array.isArray(data) &&
		typeof data.userId === "string" &&
		typeof data.roomId === "string" &&
		typeof data.createdAt === "string" &&
		typeof data.updatedAt === "string"
	);
}

export default MemberRoomEntity;
export { IsMemberRoomEntity };
