import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../../../../service/http/http.service";

@Injectable({
	providedIn: "root",
})
export class NutzerService {
	public nutzer = [];

	constructor(private httpService: HttpService) {}

	// biome-ignore lint/suspicious/noExplicitAny: muss any sein
	public getNutzer(): Observable<any> {
		return this.httpService.getData("/admin/nutzer").pipe(
			map((data) => {
				this.nutzer = data;
			}),
		);
	}
}
