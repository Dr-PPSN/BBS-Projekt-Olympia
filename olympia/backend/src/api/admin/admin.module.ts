import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { NutzerController } from "./nutzer/nutzer.controller";
import { MailModule } from "../../mail/mail.module";

@Module({
	controllers: [AdminController, NutzerController],
	providers: [AdminService],
	imports: [UserModule, MailModule],
})
export class AdminModule {}
