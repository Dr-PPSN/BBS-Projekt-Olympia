import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Formular } from "./login.constant";
import { LoginService } from "./login.service";
import { AuthService } from "../../service/auth.service";
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


	formular = new FormGroup({
		email: new FormControl(""),
		password: new FormControl(""),
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
