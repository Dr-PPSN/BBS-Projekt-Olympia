import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LOGIN_ROUTE } from "./auth.constant";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard {
	constructor(
		public auth: AuthService,
		public router: Router,
	) {}

	canActivate(): boolean {
		if (this.auth.jwtIsExpired() || !this.auth.jwtIsAdminToken()) {
			this.router.navigate([LOGIN_ROUTE]);
			return false;
		}
		return true;
	}
}
