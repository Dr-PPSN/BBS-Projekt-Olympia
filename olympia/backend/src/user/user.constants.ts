import * as bcrypt from "bcrypt";

export async function isPasswordValid(
	rawPassword: string,
	hash: string,
	salt: string,
): Promise<boolean> {
	return (await bcrypt.hash(rawPassword, salt)) === hash;
}
