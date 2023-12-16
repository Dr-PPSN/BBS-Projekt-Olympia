import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { LoginComponent } from "./login.component";
import { RequestChangePasswordComponent } from "./request-change-password/request-change-password.component";

const routes: Routes = [
	{
		path: "",
		title: "",
		component: LoginComponent,
	},
	{
		path: "request-change-password",
		title: "Passwort vergessen",
		component: RequestChangePasswordComponent,
	},
	{
		path: "change-password/:token",
		title: "Passwort ändern",
		component: ChangePasswordComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {}
