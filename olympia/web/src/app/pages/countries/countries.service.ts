import { Injectable } from "@angular/core";
import { HttpService } from "../../service/http/http.service";
import { map } from "rxjs";
import { MedalCount } from "../medal-count/medal-count/medal-count.component";

export interface CountryMedalCountDto {
	medalCount: MedalCount;
}

@Injectable({
	providedIn: "root",
})
export class CountriesService {
	country: string | null = null;

	medalCount: MedalCount | null = null;

	constructor(private httpService: HttpService) {}

	setCountry(country: string) {
		this.country = country;
	}

	loadCountryResults() {
		// reset results
		if (!this.country) {
			throw new Error("No country set");
		}
		return this.httpService
			.getData(`/countries/${this.country}/sports-results`)
			.pipe(
				map((data) => {
					console.log(data);
				}),
			);
	}

	loadCountryMedalCount() {
		this.medalCount = null;
		if (!this.country) {
			throw new Error("No country set");
		}
		return this.httpService
			.getData(`/countries/${this.country}/medal-count`)
			.pipe(
				map((data: CountryMedalCountDto) => {
					this.medalCount = data.medalCount;
					console.log(this.medalCount);
				}),
			);
	}
}
