import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
	selector: "app-sports-results-discipline",
	templateUrl: "./sports-results-discipline.component.html",
	styleUrl: "./sports-results-discipline.component.sass",
})
export class SportsResultsDisciplineComponent implements OnInit {
	discipline: string | null = null;
	routerSubscription: Subscription | null = null;

	constructor(private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.subscribeToDisciplineChange();
	}

	private subscribeToDisciplineChange(): void {
		this.routerSubscription = this.activatedRoute.data.subscribe(
			({ discipline }) => {
				this.discipline = discipline;
			},
		);
	}

	ngOnDestroy(): void {
		this.routerSubscription?.unsubscribe();
	}
}
