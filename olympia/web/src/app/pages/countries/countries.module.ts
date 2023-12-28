import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CountriesRoutingModule } from "./countries-routing.module";
import { CountriesDetailComponent } from "./countries/countries-detail/countries-detail.component";
import { CountriesComponent } from "./countries/countries.component";

@NgModule({
	declarations: [CountriesDetailComponent, CountriesComponent],
	imports: [CommonModule, CountriesRoutingModule],
})
export class CountriesModule {}
