import { Controller, Get, Param } from "@nestjs/common";
import { Api } from "./sports-results.constant";
import { SportsResultsService } from "./sports-results.service";

@Controller(Api.TITLE)
export class SportsResultsController {
	constructor(private sportsResultsService: SportsResultsService) {}

	@Get(":discipline")
	async getSportsResults(@Param() params: { discipline: string }) {
		return await this.sportsResultsService.getSportsResults(params.discipline);
	}
}
