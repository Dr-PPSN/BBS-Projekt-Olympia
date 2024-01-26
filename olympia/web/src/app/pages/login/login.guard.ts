import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth/auth.service";

@Injectable()
export class LoginGuard {
	constructor(public authService: AuthService, public router: Router) {}

	canActivate(): boolean {
		return !this.authService.isLoggedIn();
	}
}
