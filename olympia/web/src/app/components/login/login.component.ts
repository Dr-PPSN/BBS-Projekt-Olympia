import { Component } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Formular } from "./login.constant";
@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.sass"],
})
export class LoginComponent {
	public Formular = Formular;

	formular = new FormGroup({
		email: new FormControl(""),
		password: new FormControl(""),
	});

	login() {
		console.log(this.formular.value);
	}
}
