import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

const JWT_KEY = "jwtToken";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private jwtHelper: JwtHelperService) {}

	public saveJwtToken(token: string) {
		localStorage.setItem(JWT_KEY, token);
	}

	public getToken(): string | null {
		return localStorage.getItem(JWT_KEY);
	}

	public jwtIsValid(): boolean {
		const token = this.getToken();
		return !this.jwtHelper.isTokenExpired(token);
	}
}
