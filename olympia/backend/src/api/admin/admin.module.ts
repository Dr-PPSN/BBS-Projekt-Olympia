import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/user/user.module";
import { MailModule } from "../../mail/mail.module";
import { ImageModule } from "../images/image.module";
import { Athlete } from "../sports-results/entity/athlete.entity";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { AthleteController } from "./athletes/athlete.controller";
import { AthleteService } from "./athletes/athlete.service";
import { UserController } from "./user/user.controller";

@Module({
	controllers: [AdminController, UserController, AthleteController],
	providers: [AdminService, AthleteService],
	imports: [
		TypeOrmModule.forFeature([Athlete]),
		UserModule,
		MailModule,
		ImageModule,
	],
})
export class AdminModule {}
