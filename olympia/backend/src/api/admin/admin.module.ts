import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
	controllers: [AdminController],
	providers: [AdminService],
	imports: [UserModule],
})
export class AdminModule {}
