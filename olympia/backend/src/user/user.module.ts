import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChangePasswordToken } from "./entity/change_password_token.entity";
import { User } from "./entity/user.entity";
import { UserService } from "./user.service";
import { TokenService } from "./tokens/token.service";
import { TokenCleanupService } from "./tokens/token-cleanup.service";
import { MailModule } from "../mail/mail.module";

@Module({
	imports: [TypeOrmModule.forFeature([User, ChangePasswordToken]), MailModule],
	providers: [UserService, TokenService, TokenCleanupService],
	exports: [UserService, TokenService],
})
export class UserModule {
	constructor(private readonly tokenCleanupService: TokenCleanupService) {
		this.tokenCleanupService.startTokenCleanup();
	}
}
