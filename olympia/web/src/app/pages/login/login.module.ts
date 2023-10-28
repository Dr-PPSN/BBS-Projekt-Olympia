import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [ResetPasswordComponent, LoginComponent],
	imports: [
		CommonModule,
		LoginRoutingModule,
		MatInputModule,
		ReactiveFormsModule,
	],
	providers: [],
})
export class LoginModule {}
