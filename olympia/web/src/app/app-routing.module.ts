import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginGuard } from "./pages/login/login.guard";
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

	// Platzhalter:
	{ path: "laender", title: "Länder", component: LandingPageComponent },
	{
		path: "ergebnisse",
		title: "Ergebnisse",
		component: LandingPageComponent,
		children: [
			{
				path: "weitsprung",
				title: "Ergebnisse | Weitsprung",
				component: LandingPageComponent,
			},
			{
				path: "100m-lauf",
				title: "Ergebnisse | 100m-Lauf",
				component: LandingPageComponent,
			},
			{
				path: "springreiten",
				title: "Ergebnisse | Springreiten",
				component: LandingPageComponent,
			},
			{
				path: "schwimmen",
				title: "Ergebnisse | Schwimmen",
				component: LandingPageComponent,
			},
		],
	},
	{
		path: "medaillenspiegel",
		title: "Medaillenspiegel",
		component: LandingPageComponent,
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
