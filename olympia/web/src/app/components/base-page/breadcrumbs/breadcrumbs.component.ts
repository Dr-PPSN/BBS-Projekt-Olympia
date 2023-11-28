import { Component } from "@angular/core";
import { BreadcrumbsService } from "./breadcrumbs.service";
import { Breadcrumb } from "./breadcrumbs.model";
import { Observable } from "rxjs";

@Component({
	selector: "breadcrumbs",
	templateUrl: "./breadcrumbs.component.html",
	styleUrls: ["./breadcrumbs.component.sass"],
})
export class BreadcrumbsComponent {
	public breadcrumbs: Observable<Array<Breadcrumb>>;

	constructor(public readonly breadcrumbsService: BreadcrumbsService) {
		this.breadcrumbs = breadcrumbsService.breadcrumbs;
	}
}
