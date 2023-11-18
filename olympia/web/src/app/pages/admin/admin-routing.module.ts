import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AthletenComponent } from "./admin-uebersicht/athleten/athleten.component";
import { KampfrichterComponent } from "./admin-uebersicht/kampfrichter/kampfrichter.component";

const routes: Routes = [
	{
		path: "athleten",
		title: "Admin | Athleten",
		component: AthletenComponent,
	},
	{
		path: "kampfrichter",
		title: "Admin | Kampfrichter",
		component: KampfrichterComponent,
	},
	{
		path: "",
		redirectTo: "athleten",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
