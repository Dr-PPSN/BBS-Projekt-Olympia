import {
	Controller,
	Get,
	HttpCode,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { Api } from "./auth.constants";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller(Api.TITEL)
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get("test")
	getHello(): string {
		return "Hello World!";
	}

	// UseGuards hängt user an request an
	@UseGuards(LocalAuthGuard)
	@Post(Api.LOGIN)
	@HttpCode(200)
	async login(@Request() request) {
		return this.authService.login(request.user);
	}
}
