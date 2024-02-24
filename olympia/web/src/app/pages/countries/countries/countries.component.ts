import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
// import { ChartType } from "angular-google-charts";
import { Observable, Subscription, map, startWith } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatAutocompleteActivatedEvent } from "@angular/material/autocomplete";
import { getAllCountries, getCountryCode } from "../../../utils/country.utils";

@Component({
	selector: "countries",
	templateUrl: "./countries.component.html",
	styleUrls: ["./countries.component.sass"],
})
export class CountriesComponent {
	formGroup = new FormGroup({
		country: new FormControl(""),
	});
	options: string[] = getAllCountries();
	filteredOptions: Observable<string[]> | undefined;

	routerSubscription: Subscription | null = null;

	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
		this.subscribeToCountryChange();
	}

	private subscribeToCountryChange(): void {
		this.routerSubscription = this.activatedRoute.data.subscribe(
			({ country }) => {
				console.log(country);
				this.setCountryField(country);
			},
		);
	}

	private setCountryField(country: string) {
		this.formGroup.controls["country"].setValue(country);
	}

	ngOnInit() {
		this.filteredOptions = this.formGroup.controls["country"].valueChanges.pipe(
			startWith(""),
			map((value) => this._filter(value || "")),
		);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();
		return this.options.filter((option) =>
			option.toLowerCase().includes(filterValue),
		);
	}

	onOptionSelected(event: MatAutocompleteActivatedEvent) {
		const countryCode = getCountryCode(event?.option?.value);
		if (countryCode) {
			this.routeToCountry(countryCode);
		}
	}

	private routeToCountry(countryCode: string) {
		this.router.navigate([countryCode], { relativeTo: this.activatedRoute });
	}

	// ChartType = ChartType;
	// chartData = [
	// 	["South America", 600],
	// 	["Canada", 500],
	// 	["France", 600],
	// 	["Russia", 700],
	// 	["Australia", 600],
	// ];
	// chartColumns = ["City", "Inhabitants"];
	// geoChartOptions = {
	// 	backgroundColor: "#81d4fa",
	// 	legend: "none",
	// 	region: "world",
	// 	enableRegionInteractivity: true,
	// };

	// onSelect(event: any) {
	// 	console.log(event);
	// }
}
