import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { UserService } from "src/user/user.service";
import { isPasswordValid } from "../../user/user.util";

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService,
	) {}

	// biome-ignore lint: muss any sein
	async validateUser(email: string, rawPassword: string): Promise<any> {
		const user = await this.userService.findUserWithEmail(email);
		if (!user || !user.passwort || !user.salt) {
			return null;
		}
		if (!(await isPasswordValid(rawPassword, user.passwort, user.salt))) {
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

	async sendChangePasswordMail(email: string): Promise<void> {
		this.userService.sendChangePasswordMail(email);
	}

	async changePassword(token: string, newPassword: string): Promise<void> {
		await this.userService.changePassword(token, newPassword);
	}
}
