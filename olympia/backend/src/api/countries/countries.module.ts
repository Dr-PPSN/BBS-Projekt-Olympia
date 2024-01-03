import { Module } from "@nestjs/common";
import { CountriesController } from "./countries.controller";
import { CountrieesService } from "./countries.service";

@Module({
	providers: [CountrieesService],
	controllers: [CountriesController],
})
export class CountriesModule {}
