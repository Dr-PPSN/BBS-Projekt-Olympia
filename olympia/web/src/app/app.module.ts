import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./service/http.service";
import { AuthService } from "./service/auth.service";

@NgModule({
	declarations: [AppComponent, LandingPageComponent, LoginComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule,
	],
	providers: [HttpService, AuthService],
	bootstrap: [AppComponent],
})
export class AppModule {}
