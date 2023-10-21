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

	public getToken(): string | null {
		return getToken();
	}

	public jwtIsValid(): boolean {
		const token = this.getToken();
		return !this.jwtHelper.isTokenExpired(token);
	}
}
