import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SportsResultsComponent } from "./sports-results/sports-results.component";
import { LaufenComponent } from "./sports-results/laufen/laufen.component";
import { SchwimmenComponent } from "./sports-results/schwimmen/schwimmen.component";
import { SpringreitenComponent } from "./sports-results/springreiten/springreiten.component";
import { WeitsprungComponent } from "./sports-results/weitsprung/weitsprung.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: SportsResultsComponent,
	},
	{
		path: "weitsprung",
		title: "Weitsprung",
		component: WeitsprungComponent,
	},
	{
		path: "100m-lauf",
		title: "100m-Lauf",
		component: LaufenComponent,
	},
	{
		path: "springreiten",
		title: "Springreiten",
		component: SpringreitenComponent,
	},
	{
		path: "schwimmen",
		title: "Schwimmen",
		component: SchwimmenComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SportsResultsRoutingModule {}
