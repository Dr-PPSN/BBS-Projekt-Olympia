import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { Api } from "./sports-results.constant";
import { SportsResultsService } from "./sports-results.service";
import { HttpAdapterHost } from "@nestjs/core";

@Controller(Api.TITLE)
export class SportsResultsController {
	constructor(private sportsResultsService: SportsResultsService) {}

	@Get(":discipline")
	async getSportsResults(@Param() params: { discipline: string }) {
		return await this.sportsResultsService.getSportsResults(params.discipline);
	}

	@HttpCode(200)
	@Post(":discipline/save")
	async saveSportsResult(
		@Param() params: { discipline: string },
		@Body() row: any, // Hier musst du den Typ entsprechend anpassen
	) {
		// Füge hier die Logik hinzu, um die Zeile zu speichern
		// Du kannst auf die Dienste zugreifen, um die Datenbankoperationen durchzuführen

		// Beispiel:
		const savedRow = await this.sportsResultsService.saveSportsResult(params.discipline, row);

		return savedRow; // Du kannst die gespeicherte Zeile oder eine Bestätigung zurückgeben
	}

}
