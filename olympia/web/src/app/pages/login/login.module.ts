import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NotifierModule } from "angular-notifier";
import { notifierOptions } from "src/app/notifications/notification.constant";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login/login.component";
import { RequestChangePasswordComponent } from "./request-change-password/request-change-password.component";

@NgModule({
	declarations: [
		ChangePasswordComponent,
		LoginComponent,
		RequestChangePasswordComponent,
	],
	imports: [
		CommonModule,
		LoginRoutingModule,
		MatInputModule,
		ReactiveFormsModule,
		NotifierModule.withConfig(notifierOptions),
	],
	providers: [],
})
export class LoginModule {}
