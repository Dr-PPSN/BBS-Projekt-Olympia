import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { User } from "../user/user.model";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	// biome-ignore lint: muss any sein
	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.userService.findeUserMitEmail(email);
		if (user?.password === pass) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: User) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
