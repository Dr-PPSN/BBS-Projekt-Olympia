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

export interface SportsResults {
	male: SportsResult[];
	female: SportsResult[];
}

@Component({
	selector: "app-sports-results-discipline",
	templateUrl: "./sports-results-discipline.component.html",
	styleUrl: "./sports-results-discipline.component.sass",
})
export class SportsResultsDisciplineComponent implements OnInit {
	private routerSubscription: Subscription | null = null;
	private discipline: string | null = null;
	sportResultsMales: SportsResult[] = [];
	sportResultsFemales: SportsResult[] = [];
	loadingAnimationIsActive = signal(true);
	columns: Column[] = [
		{ name: "firstName", label: "Vorname" },
		{ name: "lastName", label: "Nachname" },
		{ name: "country", label: "Land" },
		{ name: "value", label: "Ergebnis" },
		{ name: "medal", label: "Medaille" },
	];

	constructor(
		private activatedRoute: ActivatedRoute,
		private sportsResultsService: SportsResultsService,
		private toastrService: ToastrService,
	) {}

	ngOnInit(): void {
		this.subscribeToDisciplineChange();
	}

	private subscribeToDisciplineChange(): void {
		this.routerSubscription = this.activatedRoute.data.subscribe(
			({ discipline }) => {
				this.discipline = discipline;
				this.loadSportsResults();
			},
		);
	}

	private loadSportsResults(): void {
		if (!this.discipline) {
			return;
		}

		this.sportResultsMales = [];
		this.sportResultsFemales = [];
		this.showLoadingAnimation();
		this.sportsResultsService.getSportsResults(this.discipline).subscribe({
			next: (data: SportsResults) => {
				this.sportResultsMales = data.male;
				this.sportResultsFemales = data.female;
				this.hideLoadingAnimation();
			},
			error: (error) => {
				this.showErrorNotification(error);
				this.hideLoadingAnimation();
			},
		});
	}

	dataIsLoaded(): boolean {
		return (
			this.sportResultsMales.length !== 0 &&
			this.sportResultsFemales.length !== 0
		);
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
