import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { Column } from "../../../../components/olympia-table/olympia-table.component";
import { SportsResultsService } from "../../sports-results.service";

export interface SportsResult {
	uuid: string;
	firstName: string;
	lastName: string;
	country: string;
	value: number;
	medal: string | null;
}

@Component({
	selector: "app-sports-results-discipline",
	templateUrl: "./sports-results-discipline.component.html",
	styleUrl: "./sports-results-discipline.component.sass",
})
export class SportsResultsDisciplineComponent implements OnInit {
	private routerSubscription: Subscription | null = null;
	loadingAnimationIsActive = signal(true);
	columns: Column[] = [
		{ name: "firstName", label: "Vorname" },
		{ name: "lastName", label: "Nachname" },
		{ name: "country", label: "Land" },
		{ name: "value", label: "Ergebnis" },
		{ name: "medal", label: "Medaille" },
	];

	constructor(
		public sportsResultsService: SportsResultsService,
		private activatedRoute: ActivatedRoute,
		private toastrService: ToastrService,
	) {}

	ngOnInit(): void {
		this.subscribeToDisciplineChange();
	}

	private subscribeToDisciplineChange(): void {
		this.routerSubscription = this.activatedRoute.data.subscribe(
			({ discipline }) => {
				this.sportsResultsService.setDiscipline(discipline);
				this.loadSportsResults();
			},
		);
	}

	private loadSportsResults(): void {
		this.showLoadingAnimation();
		this.sportsResultsService.loadSportsResults().subscribe({
			next: () => {
				this.hideLoadingAnimation();
			},
			error: (error) => {
				this.showErrorNotification(error);
				this.hideLoadingAnimation();
			},
		});
	}

	showLoadingAnimation(): void {
		this.loadingAnimationIsActive.set(true);
	}

	hideLoadingAnimation(): void {
		this.loadingAnimationIsActive.set(false);
	}

	private showErrorNotification(error: HttpErrorResponse) {
		this.toastrService.error(error.error.message);
	}

	ngOnDestroy(): void {
		this.routerSubscription?.unsubscribe();
	}
}
