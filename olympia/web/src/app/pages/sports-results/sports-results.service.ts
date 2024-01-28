import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { HttpService } from "../../service/http/http.service";
import { SportsResult } from "./sports-results/sports-results-discipline/sports-results-discipline.component";
import {
	WinnersPodium,
	WinnersPodiumAthlete,
} from "./sports-results/sports-results-discipline/winners-podium/winners-podium.component";
import { getDisciplineUnit } from "./sports-results.utils";

export interface Athlete {
	uuid: string;
	firstName: string;
	lastName: string;
	country: string;
	sportsResult: {
		value: number;
		medal: string | null;
	};
}
export interface SportsResults {
	male: SportsResult[];
	female: SportsResult[];
}
export interface Winners {
	male: WinnersPodium | undefined;
	female: WinnersPodium | undefined;
}

@Injectable({
	providedIn: "root",
})
export class SportsResultsService {
	discipline: string | null = null;
	sportsResults: SportsResults = {
		male: [],
		female: [],
	};
	winners: Winners = {
		male: undefined,
		female: undefined,
	};

	constructor(private httpService: HttpService) {}

	setDiscipline(discipline: string) {
		this.discipline = discipline;
	}

	loadSportsResults() {
		this.sportsResults.male = [];
		this.sportsResults.female = [];
		this.winners.male = undefined;
		this.winners.female = undefined;
		if (!this.discipline) {
			throw new Error("No discipline set");
		}
		return this.httpService.getData(`/sports-results/${this.discipline}`).pipe(
			map((data) => {
				this.sportsResults.male = this.transformSportsResults(data.male);
				this.sportsResults.female = this.transformSportsResults(data.female);
				this.winners.male = this.extractWinners(data.male);
				this.winners.female = this.extractWinners(data.female);
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

	private extractWinners(data: Athlete[]): WinnersPodium {
		return {
			gold: this.findAthleteWithMedal(data, "gold"),
			silver: this.findAthleteWithMedal(data, "silver"),
			bronze: this.findAthleteWithMedal(data, "bronze"),
		};
	}

	private findAthleteWithMedal(
		data: Athlete[],
		medal: string,
	): WinnersPodiumAthlete | undefined {
		const athlete = data.find(
			(athlete) => athlete.sportsResult.medal === medal,
		);
		if (!athlete) {
			return undefined;
		}
		return {
			uuid: athlete.uuid,
			name: `${athlete.firstName} ${athlete.lastName}`,
			country: athlete.country,
			sportsResult: `${athlete.sportsResult.value.toPrecision(
				3,
			)} ${getDisciplineUnit(this.discipline)}`,
		};
	}

	dataIsLoaded(): boolean {
		return (
			this.sportsResults.male.length !== 0 &&
			this.sportsResults.female.length !== 0
		);
	}
}
