import { Component } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormGroupDirective,
	NgForm,
	Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth/auth.service";
import { Formular } from "../login.constant";
import { LoginService } from "../login.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

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
	selector: "login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.sass"],
})
export class LoginComponent {
	constructor(
		private loginService: LoginService,
		private authService: AuthService,
		private router: Router,
		private toastrService: ToastrService,
	) {}

	matcher = new MyErrorStateMatcher();

	Formular = Formular;
	formular = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required]),
	});

	login() {
		const email = this.formular.value.email ? this.formular.value.email : "";
		const password = this.formular.value.password
			? this.formular.value.password
			: "";

		if (this.formular.invalid) {
			return;
		}

		this.loginService.login(email, password).subscribe({
			next: (data) => {
				this.authService.saveJwtToken(data.access_token);
				this.navigateToLandingPage();
			},
			error: (error) => {
				if (error.status === 401) {
					this.showEmailOrPasswordInvalidError();
					return;
				}
				this.showLoginError(error);
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

	public showPasswordIsRequired(): boolean | undefined {
		return this.formular.get(Formular.Password.NAME)?.hasError("required");
	}

	private navigateToLandingPage() {
		this.router.navigate(["/"]);
	}

	private showEmailOrPasswordInvalidError() {
		this.toastrService.error("Email oder Passwort inkorrekt");
	}

	private showLoginError(error: HttpErrorResponse) {
		this.toastrService.error(error.error.message);
	}
}
