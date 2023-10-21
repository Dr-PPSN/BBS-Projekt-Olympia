import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	private apiUrl = "http://localhost:4200/api";

	constructor(private http: HttpClient) {}

	getData(endpoint: string, token?: string) {
		const headers = this.setHeaders("application/json", token);

		return this.http.get(this.apiUrl + endpoint, { headers: headers });
	}

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

	private setHeaders(contentType: string, token?: string): HttpHeaders {
		return new HttpHeaders({
			"Content-Type": contentType,
			Authorization: token ? `Bearer ${token}` : "",
		});
	}
}
