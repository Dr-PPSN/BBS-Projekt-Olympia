import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Einladung } from "./entity/einladung.entity";
import { Nutzer } from "./entity/nutzer.entity";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([Nutzer, Einladung])],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
