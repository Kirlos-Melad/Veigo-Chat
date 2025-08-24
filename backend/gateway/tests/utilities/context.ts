const User: {
	id?: string;
	clientId?: string;

	account?: {
		email: string;
		isEmailVerified?: boolean;

		password: string;

		phone?: string;
		isPhoneVerified?: boolean;
	};

	profile?: {
		photoPath: string;
		name: string;
		about: string;
	};

	token?: {
		access: string;
		refresh: string;
	};
} = {};

export default { User };
