import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nutzer } from "./entity/nutzer.entity";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([Nutzer])],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
