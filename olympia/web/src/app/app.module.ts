import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LoginComponent } from "./components/login/login.component";
import { getToken } from "./service/auth/auth.constant";
import { AuthGuardService } from "./service/auth/auth.guard.service";
import { AuthService } from "./service/auth/auth.service";
import { HttpService } from "./service/http/http.service";

@NgModule({
	declarations: [AppComponent, LandingPageComponent, LoginComponent],
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
		MatInputModule,
	],
	providers: [
		HttpService,
		AuthService,
		AuthGuardService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
