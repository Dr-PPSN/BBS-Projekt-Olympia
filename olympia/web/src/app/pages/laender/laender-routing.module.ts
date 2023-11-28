import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "src/app/components/landing-page/landing-page.component";
import { LaenderUebersichtComponent } from "./laender-uebersicht/laender-uebersicht.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: LaenderUebersichtComponent,
	},
	{
		path: ":land",
		title: "Land",
		component: LandingPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LaenderRoutingModule {}
