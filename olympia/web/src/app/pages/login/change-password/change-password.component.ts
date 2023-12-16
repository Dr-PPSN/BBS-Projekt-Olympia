import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgForm,
	Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { Notification } from "../../../notifications/notification.constant";
import { Formular } from "../login.constant";
import { LoginService } from "../login.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null,
	): boolean {
		const isSubmitted = form?.submitted;
		return !!(
			control?.invalid &&
			(control.dirty || control.touched || isSubmitted)
		);
	}
}

@Component({
	selector: "change-password",
	templateUrl: "./change-password.component.html",
	styleUrls: ["./change-password.component.sass"],
})
export class ChangePasswordComponent {
	resetPasswordToken: string | null = null;

	Formular = Formular;
	formular = new FormGroup({
		password: new FormControl("", [Validators.required]),
		passwordRepeat: new FormControl("", [Validators.required]),
	});
	matcher = new MyErrorStateMatcher();

	constructor(
		private loginService: LoginService,
		private notifier: NotifierService,
		private route: ActivatedRoute,
	) {}

	public ngOnInit(): void {
		// biome-ignore lint/complexity/useLiteralKeys: ignoriert
		this.resetPasswordToken = this.route.snapshot.params["token"];
	}

	public changePassword() {
		if (this.formular.invalid) {
			return;
		}
		if (!this.resetPasswordToken) {
			this.showInvalidTokenError();
			return;
		}
		const newPassword = this.formular.value.password
			? this.formular.value.password
			: "";

		this.loginService
			.changePassword(this.resetPasswordToken, newPassword)
			.subscribe({
				next: () => {
					this.showPasswordChangedNotification();
				},
				error: (error) => {
					this.showPasswordChangeError(error);
				},
			});
	}

	public passwordsDoNotMatch(): boolean {
		return this.formular.value.password !== this.formular.value.passwordRepeat;
	}

	public showPasswordIsRequired(): boolean | undefined {
		return this.formular.get(Formular.Password.NAME)?.hasError("required");
	}

	public showPasswordRepeatIsRequired(): boolean | undefined {
		return this.formular
			.get(Formular.PasswordRepeat.NAME)
			?.hasError("required");
	}

	private showInvalidTokenError() {
		this.notifier.notify(
			Notification.ERROR,
			"Ungültiger Link zum Zurücksetzen des Passworts",
		);
	}

	private showPasswordChangedNotification() {
		this.notifier.notify(
			Notification.SUCCESS,
			"Das Passwort wurde erfolgreich geändert",
		);
	}

	private showPasswordChangeError(error: HttpErrorResponse) {
		this.notifier.notify(Notification.ERROR, error.error.message);
	}
}
