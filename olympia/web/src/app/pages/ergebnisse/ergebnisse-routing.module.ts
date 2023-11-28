import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ErgebnisseUebersichtComponent } from "./ergebnisse-uebersicht/ergebnisse-uebersicht.component";
import { LaufenComponent } from "./ergebnisse-uebersicht/laufen/laufen.component";
import { SchwimmenComponent } from "./ergebnisse-uebersicht/schwimmen/schwimmen.component";
import { SpringreitenComponent } from "./ergebnisse-uebersicht/springreiten/springreiten.component";
import { WeitsprungComponent } from "./ergebnisse-uebersicht/weitsprung/weitsprung.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: ErgebnisseUebersichtComponent,
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
export class ErgebnisseRoutingModule {}
