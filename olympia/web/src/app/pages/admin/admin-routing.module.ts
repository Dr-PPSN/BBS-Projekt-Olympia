import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "src/app/components/landing-page/landing-page.component";

const routes: Routes = [
	{
		path: "athleten",
		title: "Admin | Athleten",
		component: LandingPageComponent,
	},
	{
		path: "kampfrichter",
		title: "Admin | Kampfrichter",
		component: LandingPageComponent,
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
