import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { UserService } from "src/user/user.service";
import { isPasswordValid } from "../user/user.constants";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	// biome-ignore lint: muss any sein
	async validateUser(email: string, rawPassword: string): Promise<any> {
		const user = await this.userService.findNutzerWithEmail(email);
		if (!user) {
			return null;
		}
		if (!isPasswordValid(rawPassword, user.passwort, user.salt)) {
			return null;
		}
		const { passwort, salt, ...result } = user;
		return result;
	}

	async login(user: Nutzer): Promise<{ access_token: string }> {
		const payload = {
			email: user.email,
			sub: user.uuid,
			istAdmin: user.istAdmin,
		};
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
