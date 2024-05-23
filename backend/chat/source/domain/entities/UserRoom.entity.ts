interface UserRoomEntity {
	userId: string;
	roomId: string;

	createdAt: Date;
	updatedAt: Date;
}

function IsUserRoomEntity(data: any): data is UserRoomEntity {
	return (
		data &&
		typeof data === "object" &&
		!Array.isArray(data) &&
		typeof data.userId === "string" &&
		typeof data.roomId === "string" &&
		data.createdAt instanceof Date &&
		data.updatedAt instanceof Date
	);
}

export default UserRoomEntity;
export { IsUserRoomEntity };
