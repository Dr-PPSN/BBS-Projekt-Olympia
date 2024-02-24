import {
	Body,
	Controller,
	HttpCode,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { Api } from "./auth.constants";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";

export class ChangeEmailDto {
	email: string;
}

export class ChangePasswordDto {
	token: string;
	newPassword: string;
}

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
	async requestChangePassword(@Body() changeEmailDto: ChangeEmailDto) {
		this.authService.sendChangePasswordMail(changeEmailDto.email);
	}

	@Post(Api.CHANGE_PASSWORD)
	@HttpCode(200)
	async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<void> {
		return await this.authService.changePassword(changePasswordDto.token, changePasswordDto.newPassword);
	}
}
