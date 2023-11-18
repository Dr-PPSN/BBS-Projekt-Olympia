import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginGuard } from "./pages/login/login.guard";
import { MedaillenspiegelComponent } from "./pages/medaillenspiegel/medaillenspiegel/medaillenspiegel.component";
import { AuthGuard } from "./service/auth/auth.guard";

const routes: Routes = [
	{ path: "", title: "Olympia", component: LandingPageComponent },
	{
		path: "login",
		title: "Login",
		loadChildren: () =>
			import("./pages/login/login.module").then((m) => m.LoginModule),
		canActivate: [() => inject(LoginGuard).canActivate()],
	},
	{
		path: "laender",
		title: "Länder",
		loadChildren: () =>
			import("./pages/laender/laender.module").then((m) => m.LaenderModule),
	},
	{
		path: "ergebnisse",
		title: "Ergebnisse",
		loadChildren: () =>
			import("./pages/ergebnisse/ergebnisse.module").then(
				(m) => m.ErgebnisseModule,
			),
	},
	{
		path: "medaillenspiegel",
		title: "Medaillenspiegel",
		component: MedaillenspiegelComponent,
	},
	{
		path: "admin",
		title: "Admin",
		loadChildren: () =>
			import("./pages/admin/admin.module").then((m) => m.AdminModule),
		canActivate: [() => inject(AuthGuard).canActivate()],
	},
	{ path: "**", component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
