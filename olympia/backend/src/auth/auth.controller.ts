import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { Api } from "./auth.constant";

@Controller(Api.TITEL)
export class AuthController {
	constructor(private authService: AuthService) {}

	// UseGuards hängt user an request an
	@UseGuards(LocalAuthGuard)
	@Post(Api.LOGIN)
	async login(@Request() request) {
		return this.authService.login(request.user);
	}
}
