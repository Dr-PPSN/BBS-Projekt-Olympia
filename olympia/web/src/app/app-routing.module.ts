import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes, TitleStrategy } from "@angular/router";
import { BasePageComponent } from "./components/base-page/base-page.component";
import { PageTitleStrategy } from "./page-title.strategy";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LoginGuard } from "./pages/login/login.guard";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AuthGuard } from "./service/auth/auth.guard";

const routes: Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "home", title: "Olympia", component: LandingPageComponent },

	{
		path: "app",
		component: BasePageComponent,
		children: [
			{
				path: "countries",
				title: "Länder",
				loadChildren: () =>
					import("./pages/countries/countries.module").then(
						(m) => m.CountriesModule,
					),
			},
			{
				path: "sports-results",
				title: "Ergebnisse",
				loadChildren: () =>
					import("./pages/sports-results/sports-results.module").then(
						(m) => m.SportsResultsModule,
					),
			},
			{
				path: "medal-count",
				title: "Medaillenspiegel",
				loadChildren: () =>
					import("./pages/medal-count/medal-count.module").then(
						(m) => m.MedalCountModule,
					),
			},
			{
				path: "login",
				title: "Login",
				loadChildren: () =>
					import("./pages/login/login.module").then((m) => m.LoginModule),
				canActivate: [() => inject(LoginGuard).canActivate()],
			},
			{
				path: "admin",
				title: "Admin",
				loadChildren: () =>
					import("./pages/admin/admin.module").then((m) => m.AdminModule),
				canActivate: [() => inject(AuthGuard).canActivate()],
			},
		],
	},

	{ path: "**", component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [
		{
			provide: TitleStrategy,
			useClass: PageTitleStrategy,
		},
	],
})
export class AppRoutingModule {}
