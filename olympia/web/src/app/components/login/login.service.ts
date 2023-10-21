import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpService } from "../../service/http/http.service";

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
		return this.httpService
			.postData("auth/login", sendData)
			.pipe(catchError(this.handleError));
	}

	test(): Observable<string> {
		return this.httpService
			.getData("test-user")
			.pipe(catchError(this.handleError));
	}

	// biome-ignore lint: muss any sein
	private handleError(error: any) {
		console.error(error);
		return throwError(error);
	}
}
