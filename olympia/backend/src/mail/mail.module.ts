import { join } from "path";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailService } from "./mail.service";

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: config.get("MAIL_HOST"),
					secure: true,
					port: config.get("MAIL_PORT"),
					auth: {
						user: config.get("MAIL_USER"),
						pass: config.get("MAIL_PASSWORD"),
					},
				},
				defaults: {
					from: `"No Reply" <${config.get("MAIL_FROM")}>`,
				},
				template: {
					dir: join(__dirname, "templates"),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
