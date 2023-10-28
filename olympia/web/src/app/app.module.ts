import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HoverOverMenuComponent } from "./components/hover-over-menu/hover-over-menu.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { getToken } from "./service/auth/auth.constant";
import { AuthGuard } from "./service/auth/auth.guard";
import { AuthService } from "./service/auth/auth.service";
import { HttpService } from "./service/http/http.service";
import { LoginGuard } from "./pages/login/login.guard";
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
	declarations: [AppComponent, LandingPageComponent, HoverOverMenuComponent, NotFoundComponent],
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
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatMenuModule,
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
