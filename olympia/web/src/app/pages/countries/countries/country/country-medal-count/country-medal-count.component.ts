import { Component, signal } from "@angular/core";
import { CountriesService } from "../../../countries.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "country-medal-count",
	templateUrl: "./country-medal-count.component.html",
	styleUrl: "./country-medal-count.component.sass",
})
export class CountryMedalCountComponent {
	loadingAnimationIsActive = signal(true);

	constructor(
		public countriesService: CountriesService,
		private toastrService: ToastrService,
	) {}

	ngOnInit() {
		this.loadMedalCount();
	}

	loadMedalCount() {
		this.showLoadingAnimation();
		this.countriesService.loadCountryMedalCount().subscribe({
			next: () => {
				this.hideLoadingAnimation();
			},
			error: (error) => {
				this.hideLoadingAnimation();
				this.showErrorNotification(error);
			},
		});
	}

	countryWonSomeMedals() {
		const medalCount = this.countriesService.medalCount;
		return (
			medalCount !== null &&
			(medalCount.gold !== 0 ||
				medalCount.silver !== 0 ||
				medalCount.bronze !== 0)
		);
	}

	showLoadingAnimation() {
		this.loadingAnimationIsActive.set(true);
	}

	hideLoadingAnimation() {
		this.loadingAnimationIsActive.set(false);
	}

	private showErrorNotification(error: HttpErrorResponse) {
		this.toastrService.error(error.error.message);
	}
}
