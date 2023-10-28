import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
	{
		path: "",
		title: "Login",
		component: LoginComponent,
	},
	{
		path: "reset-password",
		title: "Passwort zurücksetzen",
		component: ResetPasswordComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {}
