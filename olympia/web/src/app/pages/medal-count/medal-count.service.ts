import { Injectable } from "@angular/core";
import { HttpService } from "../../service/http/http.service";

@Injectable({
	providedIn: "root",
})
export class MedalCountService {
	constructor(private httpService: HttpService) {}

	getMedalCount() {
		return this.httpService.getData("/medal-count");
	}
}
