import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { Nutzer } from "src/user/entity/nutzer.entity";

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendUserConfirmation(user: Nutzer, token: string) {
		const url = `example.com/auth/confirm?token=${token}`;
		const name = `${user.vorname} ${user.nachname}`;

		await this.mailerService.sendMail({
			to: user.email,
			// from: '"Support Team" <support@example.com>',
			subject: "Welcome to Nice App! Confirm your Email",
			template: "./confirmation",
			context: {
				name: name,
				url,
			},
		});
	}
}
