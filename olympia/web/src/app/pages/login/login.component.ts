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
import { AuthService } from "../../service/auth/auth.service";
import { Formular } from "./login.constant";
import { LoginService } from "./login.service";

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
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.sass"],
})
export class LoginComponent {
	constructor(
		private loginService: LoginService,
		private authService: AuthService,
		private router: Router,
	) {}

	Formular = Formular;
	matcher = new MyErrorStateMatcher();
	couldNotLogIn = false;

	formular = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required]),
	});

	login() {
		const email = this.formular.value.email ? this.formular.value.email : "";
		const password = this.formular.value.password
			? this.formular.value.password
			: "";
		this.couldNotLogIn = false;
		if (this.formular.invalid) {
			return;
		}

		this.loginService.login(email, password).subscribe(
			(data) => {
				this.authService.saveJwtToken(data.access_token);
				this.navigateToLandingPage();
			},
			(error) => {
				if (error.status === 401) {
					this.couldNotLogIn = true;
					return;
				}
				console.log(error);
			},
		);
	}

	private navigateToLandingPage() {
		this.router.navigate(["/"]);
	}
}
