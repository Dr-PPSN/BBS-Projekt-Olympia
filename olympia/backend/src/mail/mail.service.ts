import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SentMessageInfo } from "nodemailer";
import { Nutzer } from "src/user/entity/nutzer.entity";

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation(user: Nutzer, token: string) {
		const url = `example.com/auth/confirm?token=${token}`;
		const name = `${user.vorname} ${user.nachname}`;

		await this.mailerService.sendMail({
			to: user.email,
			subject: "Welcome to Nice App! Confirm your Email",
			template: "./confirmation",
			context: {
				name: name,
				url,
			},
		});
	}

	async sendTestEmail(email: string): Promise<SentMessageInfo> {
		return await this.mailerService.sendMail({
			to: email,
			subject: "Test Mail",
			template: "./test",
		});
	}
}
