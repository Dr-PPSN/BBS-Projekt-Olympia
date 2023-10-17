import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class LoginService {
	constructor(private http: HttpClient) {}

	login(email: string, password: string): Observable<any> {
		return this.http
			.post<any>("http://localhost:4200/api/auth/login", { email, password })
			.pipe(catchError(this.handleError));
	}

	private handleError(error: any) {
		console.error(error);
		return throwError(error);
	}
}
