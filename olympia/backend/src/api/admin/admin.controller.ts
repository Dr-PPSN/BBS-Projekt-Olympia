import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SentMessageInfo } from "nodemailer";
import { MailService } from "../../mail/mail.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Api } from "./admin.constant";

export class TestMailDto {
	email: string;
}

@UseGuards(JwtAuthGuard)
@Controller(Api.TITLE)
export class AdminController {
	constructor(private mailService: MailService) {}

	@Post(Api.TEST_MAIL)
	async testEmail(@Body() testMailDto: TestMailDto): Promise<SentMessageInfo> {
		return await this.mailService.sendTest(testMailDto.email);
	}
}
