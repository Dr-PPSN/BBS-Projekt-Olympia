import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NotifierService } from "angular-notifier";
import { Notification } from "../../../notifications/notification.constant";
import { Formular } from "../login.constant";
import { LoginService } from "../login.service";

@Component({
	selector: "request-change-password",
	templateUrl: "./request-change-password.component.html",
	styleUrls: ["./request-change-password.component.sass"],
})
export class RequestChangePasswordComponent {
	Formular = Formular;
	formular = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
	});

	constructor(
		private loginService: LoginService,
		private notifier: NotifierService,
	) {}

	public sendPasswordChangeRequest() {
		const email = this.formular.value.email ? this.formular.value.email : "";
		if (this.formular.invalid) {
			return;
		}

		this.loginService.sendPasswordChangeRequest(email).subscribe({
			next: () => {
				this.showMailSentNotification();
			},
			error: () => {
				this.showMailSentNotification();
			},
		});
	}

	public showEmailIsInvalid(): boolean | undefined {
		return (
			this.formular.get(Formular.Email.NAME)?.hasError("email") &&
			!this.showEmailIsRequired()
		);
	}

	public showEmailIsRequired(): boolean | undefined {
		return this.formular.get(Formular.Email.NAME)?.hasError("required");
	}

	private showMailSentNotification() {
		this.notifier.notify(
			Notification.SUCCESS,
			"Falls die Mail existiert, wurde eine Mail zum Zurücksetzen des Passworts versendet.",
		);
	}
}
