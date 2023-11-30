import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import {
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	TitleStrategy,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class PageTitleStrategy extends TitleStrategy {
	constructor(private readonly title: Title) {
		super();
	}

	override updateTitle(routerState: RouterStateSnapshot): void {
		const title = this.concatTitle(routerState.root, "", "|");
		if (title) {
			this.title.setTitle(title);
		}
	}

	private concatTitle(
		route: ActivatedRouteSnapshot,
		title: string,
		separator: string,
	): string {
		if (!route) {
			return title;
		}

		let newTitle = title;
		const subTitle = route.data
			? this.getResolvedTitleForRoute(route)
			: undefined;

		if (subTitle && subTitle !== "") {
			if (title === "") {
				newTitle = subTitle;
			} else {
				newTitle = `${title} ${separator} ${subTitle}`;
			}
		}

		newTitle = this.concatTitle(route.children[0], newTitle, separator);

		return newTitle;
	}
}
