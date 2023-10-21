import { Controller, HttpCode, Post, Request, UseGuards } from "@nestjs/common";
import { Api } from "./auth.constant";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local/local-auth.guard";

@Controller(Api.TITEL)
export class AuthController {
	constructor(private authService: AuthService) {}

	// UseGuards hängt user an request an
	@UseGuards(LocalAuthGuard)
	@Post(Api.LOGIN)
	@HttpCode(200)
	async login(@Request() request) {
		return this.authService.login(request.user);
	}
}
