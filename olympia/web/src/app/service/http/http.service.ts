import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ContentType, URL_SEPARATOR } from "./http.constant";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	private apiUrl = environment.apiUrl;

	constructor(private http: HttpClient) {}

	// biome-ignore lint: muss any sein
	getData(endpoint: string): Observable<any> {
		const headers = this.getDefaultHeader();
		return this.http.get(this.apiUrl + this.ensureSlashAtBeginning(endpoint), {
			headers: headers,
		});
	}

	// biome-ignore lint: muss any sein
	postData(
		endpoint: string,
		data: any,
		headers?: HttpHeaders,
	): Observable<any> {
		const postHeaders = headers ? headers : this.getDefaultHeader();
		return this.http.post(
			this.apiUrl + this.ensureSlashAtBeginning(endpoint),
			data,
			{
				headers: postHeaders,
			},
		);
	}

	private getDefaultHeader(): HttpHeaders {
		const contentType = ContentType.APPLICATION_JSON;
		return new HttpHeaders({
			"Content-Type": contentType,
		});
	}

	private ensureSlashAtBeginning(endpoint: string): string {
		return endpoint.charAt(0) === URL_SEPARATOR
			? endpoint
			: URL_SEPARATOR + endpoint;
	}
}
