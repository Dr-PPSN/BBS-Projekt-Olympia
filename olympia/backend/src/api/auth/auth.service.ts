import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/entity/user.entity";
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
		if (!user || !user.password || !user.salt) {
			return null;
		}
		if (!(await isPasswordValid(rawPassword, user.password, user.salt))) {
			return null;
		}
		const { password, salt, ...result } = user;
		return result;
	}

	async login(user: User): Promise<{ access_token: string }> {
		const payload = {
			email: user.email,
			sub: user.uuid,
			istAdmin: user.isAdmin,
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
