import { NgModule } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	ResolveFn,
	RouterModule,
	RouterStateSnapshot,
	Routes,
} from "@angular/router";
import { CountryComponent } from "./countries/country/country.component";
import { CountriesComponent } from "./countries/countries.component";
import { getCountryName } from "../../utils/country.utils";

const countryTitleResolver: ResolveFn<string> = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
) => {
	const country = route.params["country"];
	return getCountryName(country) || "";
};

const countryResolver: ResolveFn<string> = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
) => {
	return route.params["country"];
};

const routes: Routes = [
	{
		path: "",
		title: "",
		component: CountriesComponent,
		children: [
			{
				path: ":country",
				title: countryTitleResolver,
				component: CountryComponent,
				resolve: {
					country: countryResolver,
				},
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CountriesRoutingModule {}
