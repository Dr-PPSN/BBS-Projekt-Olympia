import { Controller, Get } from "@nestjs/common";
import { Api } from "./medal-count.constant";
import { MedalCountService } from "./medal-count.service";

@Controller(Api.TITLE)
export class MedalCountController {
	constructor(private medalCountService: MedalCountService) {}

	@Get()
	async getMedalCount() {
		return await this.medalCountService.getMedalCount();
	}
}
