interface ProfileEntity {
	id: string;

	photoPath: string;
	name: string;
	about: string;

	createdAt: string;
	updatedAt: string;
}

function IsProfileEntity(data: any): data is ProfileEntity {
	return (
		data &&
		typeof data === "object" &&
		!Array.isArray(data) &&
		typeof data.id === "string" &&
		typeof data.photoPath === "string" &&
		typeof data.name === "string" &&
		typeof data.about === "string" &&
		typeof data.createdAt === "string" &&
		typeof data.updatedAt === "string"
	);
}

export default ProfileEntity;
export { IsProfileEntity };
