import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { LoggingMiddleware } from "./middleware/logging.middleware";
import { UserModule } from "./user/user.module";
import { ALL_ROUTES } from "./app.constant";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: "../../.env",
			isGlobal: true,
		}),
		// TypeOrmModule.forRoot({
		//   type: 'postgres',
		//   host: process.env.DB_HOST,
		//   port: parseInt(process.env.DB_PORT),
		//   username: process.env.DB_USERNAME,
		//   password: process.env.DB_PASSWORD,
		//   database: process.env.DB_DATABASE,
		//   entities: ['dist/**/*.entity{.ts,.js}'],
		//   autoLoadEntities: true,
		//   synchronize: true,
		// }),
		AuthModule,
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
