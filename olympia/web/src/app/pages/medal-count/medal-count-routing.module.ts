import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MedalCountComponent } from "./medal-count/medal-count.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: MedalCountComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MedalCountRoutingModule {}
