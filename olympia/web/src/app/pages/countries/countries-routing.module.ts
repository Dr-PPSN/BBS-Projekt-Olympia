import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CountriesComponent } from "./countries/countries.component";
import { CountriesDetailComponent } from "./countries/countries-detail/countries-detail.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: CountriesComponent,
	},
	{
		path: ":land",
		title: "Land",
		component: CountriesDetailComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CountriesRoutingModule {}
