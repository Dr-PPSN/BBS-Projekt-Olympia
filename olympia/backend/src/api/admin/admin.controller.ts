import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Api } from "./admin.constant";
import { MailService } from "../../mail/mail.service";
import { SentMessageInfo } from "nodemailer";
import { Request } from "express";

@UseGuards(JwtAuthGuard)
@Controller(Api.TITLE)
export class AdminController {
	constructor(private mailService: MailService) {}

	@Post(Api.TEST_MAIL)
	async testEmai(@Body() body): Promise<SentMessageInfo> {
		const email = body.email;
		return await this.mailService.sendTestEmail(email);
	}
}
