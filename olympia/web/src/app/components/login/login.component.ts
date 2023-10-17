import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Formular } from "./login.constant";
import { LoginService } from "./login.service";
@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.sass"],
})
export class LoginComponent {
	constructor(private loginService: LoginService) {}

	public Formular = Formular;

	private jwtToken: string = "";

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
			this.jwtToken = data.access_token;
		});
	}

	test() {
		this.loginService.test(this.jwtToken).subscribe((data) => {
			console.log(data);
		});
	}
}
