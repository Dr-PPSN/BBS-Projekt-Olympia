import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NotifierModule } from "angular-notifier";
import { notifierOptions } from "src/app/notifications/notification.constant";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

@NgModule({
	declarations: [ResetPasswordComponent, LoginComponent],
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
