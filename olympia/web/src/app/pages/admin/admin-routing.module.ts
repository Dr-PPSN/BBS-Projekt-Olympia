import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminUebersichtComponent } from "./admin-uebersicht/admin-uebersicht.component";
import { AthletenComponent } from "./admin-uebersicht/athleten/athleten.component";
import { NutzerComponent } from "./admin-uebersicht/nutzer/nutzer.component";

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
		path: "nutzer",
		title: "Nutzer",
		component: NutzerComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
