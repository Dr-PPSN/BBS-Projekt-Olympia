import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AthletesComponent } from "./admin/athletes/athletes.component";
import { UsersComponent } from "./admin/users/users.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: AdminComponent,
	},
	{
		path: "athletes",
		title: "Athleten",
		component: AthletesComponent,
	},
	{
		path: "users",
		title: "Nutzer",
		component: UsersComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
