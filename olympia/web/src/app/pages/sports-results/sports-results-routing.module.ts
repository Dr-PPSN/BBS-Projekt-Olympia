import { NgModule } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	ResolveFn,
	RouterModule,
	RouterStateSnapshot,
	Routes,
} from "@angular/router";
import { getDisciplineFromRouteParameter } from "./sports-results.utils";
import { SportsResultsDisciplineComponent } from "./sports-results/sports-results-discipline/sports-results-discipline.component";
import { SportsResultsComponent } from "./sports-results/sports-results.component";

const disciplineTitleResolver: ResolveFn<string> = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
) => {
	// biome-ignore lint/complexity/useLiteralKeys: ignoriert
	const discipline = route.params["discipline"];
	return getDisciplineFromRouteParameter(discipline);
};

const disciplineResolver: ResolveFn<string> = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot,
) => {
	// biome-ignore lint/complexity/useLiteralKeys: ignoriert
	return route.params["discipline"];
};

const routes: Routes = [
	{
		path: "",
		title: "",
		component: SportsResultsComponent,
	},
	{
		path: ":discipline",
		title: disciplineTitleResolver,
		component: SportsResultsDisciplineComponent,
		resolve: {
			discipline: disciplineResolver,
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SportsResultsRoutingModule {}
