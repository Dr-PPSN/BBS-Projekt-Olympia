import { Module } from "@nestjs/common";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { LaenderModule } from "./laender/laender.module";
import { MedaillenspiegelModule } from "./medaillenspiegel/medaillenspiegel.module";

@Module({
	imports: [AdminModule, AuthModule, LaenderModule, MedaillenspiegelModule],
})
export class ApiModule {}
