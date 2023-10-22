import { NestFactory } from "@nestjs/core";
import { API_PREFIX } from "./app.constants";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix(API_PREFIX);
	await app.listen(3000);
}
bootstrap();
