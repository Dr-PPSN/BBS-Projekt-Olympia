import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	private apiUrl = "http://localhost:3000/";

	constructor(private http: HttpClient) {}

	// biome-ignore lint: data muss any sein
	postData(endpoint: string, data: any, headers?: HttpHeaders) {
		if (!headers) {
			// biome-ignore lint: nerv mich nicht
			headers = new HttpHeaders({
				"Content-Type": "application/json",
			});
		}

		return this.http.post(this.apiUrl + endpoint, data, { headers: headers });
	}
}
