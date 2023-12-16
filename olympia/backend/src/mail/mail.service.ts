import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SentMessageInfo } from "nodemailer";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class MailService {
	constructor(private mailerService: MailerService) {}

	async sendInvitation(user: User, token: string) {
		const url = `http://${process.env.WEBHOST}/auth/confirm?token=${token}`;
		const name = `${user.firstName} ${user.lastName}`;

		await this.mailerService.sendMail({
			to: user.email,
			subject: "Invitation to join the olympic team",
			template: "./invitation",
			context: {
				name: name,
				url,
			},
		});
	}

	async sendChangePassword(
		user: User,
		token: string,
	): Promise<SentMessageInfo> {
		const url = `http://${process.env.WEBHOST}/app/login/change-password/${token}`;
		const name = `${user.firstName} ${user.lastName}`;

		return this.mailerService.sendMail({
			to: user.email,
			subject: "Change your Password",
			template: "./change-password",
			context: {
				name: name,
				url,
			},
		});
	}

	async sendTest(email: string): Promise<SentMessageInfo> {
		return await this.mailerService.sendMail({
			to: email,
			subject: "Test Mail",
			template: "./test",
		});
	}
}
