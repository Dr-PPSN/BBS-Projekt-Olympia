import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MedaillenspiegelComponent } from "./medaillenspiegel/medaillenspiegel.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: MedaillenspiegelComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MedaillenspiegelRoutingModule {}
