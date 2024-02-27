import { Module } from "@nestjs/common";
import { MedalCountController } from "./medal-count.controller";
import { MedalCountService } from "./medal-count.service";

@Module({
	providers: [MedalCountService],
	controllers: [MedalCountController],
	exports: [MedalCountService],
})
export class MedalCountModule {}
