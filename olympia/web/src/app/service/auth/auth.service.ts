import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { LOCAL_STORAGE_KEY_JWT, getToken } from "./auth.constant";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private jwtHelper: JwtHelperService) {}

	public saveJwtToken(token: string) {
		localStorage.setItem(LOCAL_STORAGE_KEY_JWT, token);
	}

	public jwtIsExpired(): boolean {
		const token = getToken();
		return this.jwtHelper.isTokenExpired(token);
	}

	public jwtIsValidAdminToken(): boolean {
		return !this.jwtIsExpired() && this.jwtIsAdminToken();
	}

	public jwtIsAdminToken(): boolean {
		const token = getToken();
		if (!token) {
			return false;
		}
		const tokenPayload = this.jwtHelper.decodeToken(token);
		return tokenPayload.isAdmin;
	}

	public jwtIsKampfrichterToken(): boolean {
		const token = getToken();
		if (!token) {
			return false;
		}
		const tokenPayload = this.jwtHelper.decodeToken(token);
		return !tokenPayload.isAdmin;
	}
}
