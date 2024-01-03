import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../../../../service/http/http.service";

@Injectable({
	providedIn: "root",
})
export class UserService {
	public users = [];

	constructor(private httpService: HttpService) {}

	// biome-ignore lint/suspicious/noExplicitAny: muss any sein
	public getUsers(): Observable<any> {
		return this.httpService.getData("/admin/users").pipe(
			map((data) => {
				this.users = data;
			}),
		);
	}
}
