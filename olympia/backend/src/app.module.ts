import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./api/admin/admin.module";
import { AuthModule } from "./api/auth/auth.module";
import { LaenderModule } from "./api/laender/laender.module";
import { MedalCountModule } from "./api/medal-count/medal-count.module";
import { ALL_ROUTES } from "./app.constants";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailModule } from "./mail/mail.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";
import { UserModule } from "./user/user.module";
import { ErgebnisseModule } from "./api/ergebnisse/ergebnisse.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ["../../.env", "../../mail.env"],
			isGlobal: true,
		}),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			database: process.env.POSTGRES_DB,
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			entities: ["dist/**/*.entity{.ts,.js}"],
			autoLoadEntities: true,
			synchronize: true,
		}),
		AdminModule,
		AuthModule,
		LaenderModule,
		ErgebnisseModule,
		MedalCountModule,
		MailModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes(ALL_ROUTES);
	}
}
