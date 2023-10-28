import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import { Notification } from "../../../notifications/notification.constant";
import { Formular } from "../login.constant";
import { LoginService } from "../login.service";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.sass"],
})
export class ResetPasswordComponent {
	showMailSentMessage = false;
	Formular = Formular;
	formular = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
	});

	constructor(
		private loginService: LoginService,
		private notifier: NotifierService,
	) {}

	public resetPassword() {
		const email = this.formular.value.email ? this.formular.value.email : "";
		this.showMailSentMessage = false;

		this.loginService.resetPassword(email).subscribe(
			() => {
				this.showMailSentMessage = true;
			},
			() => {
				this.notifier.notify(
					Notification.ERROR,
					"Fehler beim Zurücksetzen des Passworts",
				);
			},
		);
	}
}
