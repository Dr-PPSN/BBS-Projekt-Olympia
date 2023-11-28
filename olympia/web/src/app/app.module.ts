import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { NotifierModule } from "angular-notifier";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BasePageComponent } from "./components/base-page/base-page.component";
import { BreadcrumbsComponent } from "./components/base-page/breadcrumbs/breadcrumbs.component";
import { HoverOverMenuComponent } from "./components/hover-over-menu/hover-over-menu.component";
import { notifierOptions } from "./notifications/notification.constant";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LoginGuard } from "./pages/login/login.guard";
import { MedaillenspiegelModule } from "./pages/medaillenspiegel/medaillenspiegel.module";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { getToken } from "./service/auth/auth.constant";
import { AuthGuard } from "./service/auth/auth.guard";
import { AuthService } from "./service/auth/auth.service";
import { HttpService } from "./service/http/http.service";

@NgModule({
	declarations: [
		AppComponent,
		LandingPageComponent,
		HoverOverMenuComponent,
		NotFoundComponent,
		BasePageComponent,
		BreadcrumbsComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: getToken,
				allowedDomains: [environment.apiUrl],
			},
		}),
		NotifierModule.withConfig(notifierOptions),
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatMenuModule,
		MedaillenspiegelModule,
	],
	providers: [
		HttpService,
		AuthService,
		AuthGuard,
		LoginGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
