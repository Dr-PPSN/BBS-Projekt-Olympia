import {
	HttpClient,
	HttpErrorResponse,
	HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
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
		return this.http
			.get(this.apiUrl + this.ensureSlashAtBeginning(endpoint), {
				headers: headers,
			})
			.pipe(
				catchError((error) => {
					if (error.status === 504) {
						throw new HttpErrorResponse({
							error: { message: "Server nicht erreichbar" },
							headers: error.headers,
							status: error.status,
							statusText: "Server nicht erreichbar",
							url: error.url ? error.url : undefined,
						});
					}
					throw error;
				}),
			);
	}

	postData(
		endpoint: string,
		// biome-ignore lint: muss any sein
		data: any,
		headers?: HttpHeaders,
		// biome-ignore lint: muss any sein
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
