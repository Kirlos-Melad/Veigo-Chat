interface UserRoomEntity {
	userId: string;
	roomId: string;

	createdAt: string;
	updatedAt: string;
}

function IsUserRoomEntity(data: any): data is UserRoomEntity {
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

export default UserRoomEntity;
export { IsUserRoomEntity };
