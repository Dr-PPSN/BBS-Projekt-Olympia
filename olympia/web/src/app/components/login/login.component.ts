import { Component } from "@angular/core";
import {
	FormGroup,
	FormControl,
	Validators,
	FormGroupDirective,
	NgForm,
} from "@angular/forms";
import { Formular } from "./login.constant";
import { LoginService } from "./login.service";
import { ErrorStateMatcher } from "@angular/material/core";
import { AuthService } from "../../service/auth.service";

export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null,
	): boolean {
		const isSubmitted = form && form.submitted;
		return !!(
			control &&
			control.invalid &&
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
	) {}

	public Formular = Formular;

	matcher = new MyErrorStateMatcher();

	public formular = new FormGroup({
		email: new FormControl("", [Validators.required, Validators.email]),
		password: new FormControl("", [Validators.required]),
	});

	login() {
		const email = this.formular.value.email ? this.formular.value.email : "";
		const password = this.formular.value.password
			? this.formular.value.password
			: "";

		this.loginService.login(email, password).subscribe((data) => {
			this.authService.saveJwtToken(data.access_token);
		});
	}

	test() {
		this.loginService.test().subscribe((data) => {
			console.log(data);
		});
	}
}
