import { Module, OnModuleInit } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailModule } from "../mail/mail.module";
import { ChangePasswordToken } from "./entity/change_password_token.entity";
import { User } from "./entity/user.entity";
import { TokenCleanupService } from "./tokens/token-cleanup.service";
import { TokenService } from "./tokens/token.service";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([User, ChangePasswordToken]), MailModule],
	providers: [UserService, TokenService, TokenCleanupService],
	exports: [UserService, TokenService],
})
export class UserModule implements OnModuleInit {
	constructor(private readonly tokenCleanupService: TokenCleanupService) {}

	onModuleInit() {
		this.tokenCleanupService.startTokenCleanup();
	}
}
