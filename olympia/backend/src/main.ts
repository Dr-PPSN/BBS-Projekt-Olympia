import { NestFactory } from "@nestjs/core";
import { API_PREFIX } from "./app.constants";
import { AppModule } from "./app.module";
import { ServerErrorExceptionFilter } from "./exception-filter/server-error.exception-filter";
import "reflect-metadata";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(API_PREFIX);
	app.useGlobalFilters(new ServerErrorExceptionFilter());
	await app.listen(3000);
}
bootstrap();
