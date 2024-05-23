interface ProfileEntity {
	id: string;

	photoPath: string;
	name: string;
	about: string;

	createdAt: Date;
	updatedAt: Date;
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
		data.createdAt instanceof Date &&
		data.updatedAt instanceof Date
	);
}

export default ProfileEntity;
export { IsProfileEntity };
