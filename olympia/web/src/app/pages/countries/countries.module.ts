import { AsyncPipe, CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CountriesRoutingModule } from "./countries-routing.module";
import { CountryComponent } from "./countries/country/country.component";
import { CountriesComponent } from "./countries/countries.component";
// import { GoogleChartsModule } from "angular-google-charts";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CountryMedalCountComponent } from "./countries/country/country-medal-count/country-medal-count.component";
import { NgChartsModule } from "ng2-charts";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
	declarations: [
		CountryComponent,
		CountriesComponent,
		CountryMedalCountComponent,
	],
	imports: [
		CommonModule,
		NgChartsModule,
		CountriesRoutingModule,
		MatProgressSpinnerModule,
		// GoogleChartsModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		ReactiveFormsModule,
		AsyncPipe,
	],
})
export class CountriesModule {}
