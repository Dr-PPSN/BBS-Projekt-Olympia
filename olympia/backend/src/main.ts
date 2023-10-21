import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { API_PREFIX } from "./app.constant";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(API_PREFIX);
	await app.listen(3000);
}
bootstrap();
