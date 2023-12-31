import { Component } from "@angular/core";
import { AuthService } from "./service/auth/auth.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.sass"],
})
export class AppComponent {
	constructor(public authService: AuthService) {}
}
