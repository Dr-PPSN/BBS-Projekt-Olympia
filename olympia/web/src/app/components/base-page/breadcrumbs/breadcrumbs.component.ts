import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Breadcrumb } from "./breadcrumbs.model";
import { BreadcrumbsService } from "./breadcrumbs.service";

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
