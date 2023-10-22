import { Module } from "@nestjs/common";
import { MedaillenspiegelController } from "./medaillenspiegel.controller";
import { MedaillenspiegelService } from "./medaillenspiegel.service";

@Module({
	providers: [MedaillenspiegelService],
	controllers: [MedaillenspiegelController],
})
export class MedaillenspiegelModule {}
