import { Module } from "@nestjs/common";
import { LaenderController } from "./laender.controller";
import { LaenderService } from "./laender.service";

@Module({
	providers: [LaenderService],
	controllers: [LaenderController],
})
export class LaenderModule {}
