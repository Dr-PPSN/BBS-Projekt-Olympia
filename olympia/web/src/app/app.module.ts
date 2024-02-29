import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JwtInterceptor, JwtModule } from "@auth0/angular-jwt";
import { ToastrModule } from "ngx-toastr";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BasePageComponent } from "./components/base-page/base-page.component";
import { BreadcrumbsComponent } from "./components/base-page/breadcrumbs/breadcrumbs.component";
import { HoverOverMenuComponent } from "./components/hover-over-menu/hover-over-menu.component";
import { OlympiaTableComponent } from "./components/olympia-table/olympia-table.component";
import { LandingPageComponent } from "./pages/landing-page/landing-page.component";
import { LoginGuard } from "./pages/login/login.guard";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { getToken } from "./service/auth/auth.constant";
import { AuthGuard } from "./service/auth/auth.guard";
import { AuthService } from "./service/auth/auth.service";
import { HttpService } from "./service/http/http.service";
import { TestComponent } from './test/test.component';

@NgModule({
	declarations: [
		AppComponent,
		LandingPageComponent,
		HoverOverMenuComponent,
		NotFoundComponent,
		BasePageComponent,
		BreadcrumbsComponent,
  TestComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: getToken,
				allowedDomains: [environment.apiUrl],
			},
		}),
		ToastrModule.forRoot({
			timeOut: 5000,
			positionClass: "toast-bottom-right",
			preventDuplicates: true,
		}),
		ReactiveFormsModule,
		MatMenuModule,
		MatTableModule,
		OlympiaTableComponent,
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
