import crypto from "crypto";
import bcrypt from "bcrypt";

function isEqual(data: string | Buffer, encrypted: string) {
	return bcrypt.compareSync(data, encrypted);
}

function Hash(data: string | Buffer) {
	return bcrypt.hashSync(data, bcrypt.genSaltSync());
}

function IsStrong(password: string) {
	/*
		/^                // Start of string
		(?=.*[A-Z])       // Positive lookahead for at least one uppercase letter
		(?=.*[a-z])       // Positive lookahead for at least one lowercase letter
		(?=.*\d)          // Positive lookahead for at least one digit
		(?=\s*)          // Match zero or more whitespace characters
		.{8,}             // Match any character (except newline) for at least 8 times
		$/                // End of string	
	*/
	const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=\s*).{8,}$/;
	return passwordRegex.test(password);
}

function GenerateRandom() {
	return crypto.randomBytes(2).toString("hex") + Date.now().toString(16);
}

export default { IsStrong, GenerateRandom, isEqual, Hash };
