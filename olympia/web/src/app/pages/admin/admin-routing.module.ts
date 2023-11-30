import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AthletenComponent } from "./admin-uebersicht/athleten/athleten.component";
import { KampfrichterComponent } from "./admin-uebersicht/kampfrichter/kampfrichter.component";
import { AdminUebersichtComponent } from "./admin-uebersicht/admin-uebersicht.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: AdminUebersichtComponent,
	},
	{
		path: "athleten",
		title: "Athleten",
		component: AthletenComponent,
	},
	{
		path: "kampfrichter",
		title: "Kampfrichter",
		component: KampfrichterComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
