import { Injectable } from "@angular/core";
import { HttpService } from "../../service/http/http.service";
import { map } from "rxjs";
import { SportsResult } from "./sports-results/sports-results-discipline/sports-results-discipline.component";

@Injectable({
	providedIn: "root",
})
export class SportsResultsService {
	constructor(private httpService: HttpService) {}

	getSportsResults(discipline: string) {
		return this.httpService.getData(`/sports-results/${discipline}`).pipe(
			map((data) => {
				return {
					male: this.transformSportsResults(data.male),
					female: this.transformSportsResults(data.female),
				};
			}),
		);
	}

	private transformSportsResults(
		data: {
			uuid: string;
			firstName: string;
			lastName: string;
			country: string;
			sportsResult: {
				value: number;
				medal: string | null;
			};
		}[],
	): SportsResult[] {
		return data.map((sportsResult) => {
			return {
				uuid: sportsResult.uuid,
				firstName: sportsResult.firstName,
				lastName: sportsResult.lastName,
				country: sportsResult.country,
				value: sportsResult.sportsResult.value,
				medal: sportsResult.sportsResult.medal,
			};
		});
	}
}
