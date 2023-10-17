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

	formular = new FormGroup({
		email: new FormControl(""),
		password: new FormControl(""),
	});

	login() {
		console.log(this.formular.value);

		const email = this.formular.value.email ? this.formular.value.email : "";
		const password = this.formular.value.password
			? this.formular.value.password
			: "";

		this.loginService.login(email, password).subscribe((data) => {
			console.log(data);
		});
	}
}
