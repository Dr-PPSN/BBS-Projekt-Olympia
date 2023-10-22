import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "credentials";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./guards/jwt.strategy";
import { LocalStrategy } from "./guards/local.strategy";

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "60s" },
		}),
		UserModule,
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
