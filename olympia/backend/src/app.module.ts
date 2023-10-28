import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiModule } from "./api/api.module";
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
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			entities: ["dist/**/*.entity{.ts,.js}"],
			autoLoadEntities: true,
			synchronize: true,
		}),
		ApiModule,
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
