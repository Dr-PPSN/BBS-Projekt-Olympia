import { Component, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CountriesService } from "../../countries.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-countries-detail",
	templateUrl: "./country.component.html",
	styleUrls: ["./country.component.sass"],
})
export class CountryComponent {
	constructor(
		private activatedRoute: ActivatedRoute,
		private countriesService: CountriesService,
		private toastrService: ToastrService,
	) {}

	routerSubscription: Subscription | null = null;
	loadingAnimationIsActive = signal(true);

	ngOnInit(): void {
		this.subscribeToCountryChange();
	}

	private subscribeToCountryChange(): void {
		this.routerSubscription = this.activatedRoute.data.subscribe(
			({ country }) => {
				this.countriesService.setCountry(country);
				this.loadSportsResults();
			},
		);
	}

	private loadSportsResults(): void {
		this.showLoadingAnimation();
		this.countriesService.loadCountryResults().subscribe({
			next: () => {
				this.hideLoadingAnimation();
			},
			error: (error) => {
				this.showErrorNotification(error);
				this.hideLoadingAnimation();
			},
		});
	}

	showLoadingAnimation(): void {
		this.loadingAnimationIsActive.set(true);
	}

	hideLoadingAnimation(): void {
		this.loadingAnimationIsActive.set(false);
	}

	private showErrorNotification(error: HttpErrorResponse) {
		this.toastrService.error(error.error.message);
	}

	ngOnDestroy(): void {
		this.routerSubscription?.unsubscribe();
	}
}
