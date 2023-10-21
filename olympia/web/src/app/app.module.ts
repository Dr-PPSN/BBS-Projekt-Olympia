import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpService } from "./service/http.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { AuthService, getToken } from "./service/auth.service";
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";

@NgModule({
	declarations: [AppComponent, LandingPageComponent, LoginComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        allowedDomains: ["localhost:4200"],
      }
    }),
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatInputModule,
	],
	providers: [
		HttpService, 
		AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
