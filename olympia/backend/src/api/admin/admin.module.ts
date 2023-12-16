import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { UserController } from "./user/user.controller";
import { MailModule } from "../../mail/mail.module";

@Module({
	controllers: [AdminController, UserController],
	providers: [AdminService],
	imports: [UserModule, MailModule],
})
export class AdminModule {}
