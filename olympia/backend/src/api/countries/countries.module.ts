import { Module } from "@nestjs/common";
import { CountriesController } from "./countries.controller";
import { CountriesService } from "./countries.service";
import { MedalCountModule } from "../medal-count/medal-count.module";

@Module({
	providers: [CountriesService],
	controllers: [CountriesController],
	imports: [MedalCountModule],
})
export class CountriesModule {}
