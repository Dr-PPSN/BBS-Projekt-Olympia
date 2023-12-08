import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChangePasswordToken } from "./entity/change_password_token.entity";
import { Nutzer } from "./entity/nutzer.entity";
import { UserService } from "./user.service";
import { TokenService } from "./tokens/token.service";
import { TokenCleanupService } from "./tokens/token-cleanup.service";

@Module({
	imports: [TypeOrmModule.forFeature([Nutzer, ChangePasswordToken])],
	providers: [UserService, TokenService, TokenCleanupService],
	exports: [UserService, TokenService],
})
export class UserModule {
	constructor(private readonly tokenCleanupService: TokenCleanupService) {
		this.tokenCleanupService.startTokenCleanup();
	}
}
