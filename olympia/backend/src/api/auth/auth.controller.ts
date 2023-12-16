import {
	Body,
	Controller,
	HttpCode,
	HttpException,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { TOKEN_EXPIRED_OR_INVALID } from "../../user/tokens/token.constant";
import { Api } from "./auth.constants";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

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

	@Post(Api.REQUEST_CHANGE_PASSWORD)
	@HttpCode(200)
	async requestChangePassword(@Body() body) {
		this.authService.sendChangePasswordMail(body.email);
	}

	@Post(Api.CHANGE_PASSWORD)
	@HttpCode(200)
	async changePassword(@Body() body): Promise<void> {
		return await this.authService.changePassword(body.token, body.newPassword);
	}
}
