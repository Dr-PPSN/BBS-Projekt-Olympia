import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
	{ path: "", title: "Olympia", component: LandingPageComponent },
	{ path: "login", title: "Login", component: LoginComponent },

	// Platzhalter:
	{ path: "laender", title: "Länder", component: LandingPageComponent },
	{ path: "ergebnisse", title: "Ergebnisse", component: LandingPageComponent },
	{
		path: "medaillenspiegel",
		title: "Medaillenspiegel",
		component: LandingPageComponent,
	},
	{ path: "admin", title: "Admin", component: LandingPageComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}