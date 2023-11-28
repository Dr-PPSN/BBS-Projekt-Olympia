import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { Breadcrumb } from "./breadcrumbs.model";
import { filter } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class BreadcrumbsService implements OnDestroy {
	private routerSubscription: Subscription;
	private readonly _breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

	public readonly breadcrumbs = this._breadcrumbs.asObservable();

	constructor(private router: Router) {
		this.routerSubscription = this.router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => {
				const root = this.router.routerState.snapshot.root;
				const breadcrumbs: Breadcrumb[] = [];
				this.addBreadcrumb(root, [], breadcrumbs);
				this._breadcrumbs.next(breadcrumbs);
			});
	}

	private addBreadcrumb(
		route: ActivatedRouteSnapshot | null,
		parentUrl: string[],
		breadcrumbs: Breadcrumb[],
	) {
		if (route) {
			const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

			if (route.title) {
				const breadcrumb: Breadcrumb = {
					title: route.title,
					url: `/${routeUrl.join("/")}`,
				};
				breadcrumbs.push(breadcrumb);
			}

			this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
		}
	}

	ngOnDestroy(): void {
		this.routerSubscription.unsubscribe();
	}
}
