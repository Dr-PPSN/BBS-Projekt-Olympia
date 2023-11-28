import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes, TitleStrategy } from "@angular/router";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { LoginGuard } from "./pages/login/login.guard";
import { MedaillenspiegelComponent } from "./pages/medaillenspiegel/medaillenspiegel/medaillenspiegel.component";
import { AuthGuard } from "./service/auth/auth.guard";
import { BasePageComponent } from "./components/base-page/base-page.component";
import { PageTitleStrategy } from "./page-title.strategy";

const routes: Routes = [
	{ path: "", redirectTo: "/home", pathMatch: "full" },
	{ path: "home", title: "Olympia", component: LandingPageComponent },

	{
		path: "app",
		component: BasePageComponent,
		children: [
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
