import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AthletenComponent } from "./admin/athleten/athleten.component";
import { NutzerComponent } from "./admin/nutzer/nutzer.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: AdminComponent,
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
