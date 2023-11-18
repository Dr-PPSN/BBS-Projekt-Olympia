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
		title: "Ergebnisse | Übersicht",
		component: ErgebnisseUebersichtComponent,
	},
	{
		path: "weitsprung",
		title: "Ergebnisse | Weitsprung",
		component: WeitsprungComponent,
	},
	{
		path: "100m-lauf",
		title: "Ergebnisse | 100m-Lauf",
		component: LaufenComponent,
	},
	{
		path: "springreiten",
		title: "Ergebnisse | Springreiten",
		component: SpringreitenComponent,
	},
	{
		path: "schwimmen",
		title: "Ergebnisse | Schwimmen",
		component: SchwimmenComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ErgebnisseRoutingModule {}
