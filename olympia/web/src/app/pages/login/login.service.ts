import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpService } from "../../service/http/http.service";
import { Api } from "./login.constant";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	constructor(private httpService: HttpService) {}

	login(email: string, password: string): Observable<{ access_token: string }> {
		const sendData = {
			email,
			password,
		};
		return this.httpService.postData(Api.LOGIN, sendData);
	}

	sendPasswordChangeRequest(email: string): Observable<string> {
		const sendData = {
			email,
		};
		return this.httpService.postData(Api.REQUEST_PASSWORD_RESET, sendData);
	}

	changePassword(token: string, newPassword: string): Observable<string> {
		const sendData = {
			token,
			newPassword,
		};
		return this.httpService.postData(Api.CHANGE_PASSWORD, sendData);
	}
}
