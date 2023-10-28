import { Component } from "@angular/core";
import { Formular } from "../login.constant";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.sass"],
})
export class ResetPasswordComponent {
	public Formular = Formular;
	public formular = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
	});

	public resetPassword() {
		console.log(this.formular.value);
	}
}
