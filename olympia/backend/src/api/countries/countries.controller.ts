import { Controller, Get, Param } from "@nestjs/common";
import { Api } from "./countries.constant";
import { CountriesService } from "./countries.service";
import { MedalCountService } from "../medal-count/medal-count.service";

@Controller(Api.TITLE)
export class CountriesController {
	constructor(
		private countriesService: CountriesService,
		private medalCountService: MedalCountService,
	) {}

	@Get(":country/sports-results")
	async getSportsResults(@Param() params: { country: string }) {
		return await this.countriesService.getCountryResults(params.country);
	}

	@Get(":country/medal-count")
	async getMedalCountByCountry(@Param() params: { country: string }) {
		return await this.medalCountService.getMedalCountByCountry(params.country);
	}
}
