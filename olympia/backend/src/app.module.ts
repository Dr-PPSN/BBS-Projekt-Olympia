import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminModule } from "./api/admin/admin.module";
import { AuthModule } from "./api/auth/auth.module";
import { LaenderModule } from "./api/laender/laender.module";
import { MedaillenspiegelModule } from "./api/medaillenspiegel/medaillenspiegel.module";
import { ALL_ROUTES } from "./app.constants";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MailModule } from "./mail/mail.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: "../../.env",
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
		MedaillenspiegelModule,
		MailModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggingMiddleware).forRoutes(ALL_ROUTES);
	}
}
