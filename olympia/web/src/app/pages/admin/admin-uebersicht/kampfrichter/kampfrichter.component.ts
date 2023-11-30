import { Component, OnInit, ViewChild } from "@angular/core";
import {
	Column,
	OlympiaTableComponent,
} from "../../../../components/olympia-table/olympia-table.component";
import { KampfrichterService } from "./kampfrichter.service";
import { NotifierService } from "angular-notifier";
import { Notification } from "../../../../notifications/notification.constant";
export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
	{ position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
	{ position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
	{ position: 4, name: "Beryllium", weight: 9.0122, symbol: "Be" },
	{ position: 5, name: "Boron", weight: 10.811, symbol: "B" },
	{ position: 6, name: "Carbon", weight: 12.0107, symbol: "C" },
	{ position: 7, name: "Nitrogen", weight: 14.0067, symbol: "N" },
	{ position: 8, name: "Oxygen", weight: 15.9994, symbol: "O" },
	{ position: 9, name: "Fluorine", weight: 18.9984, symbol: "F" },
	{ position: 10, name: "Neon", weight: 20.1797, symbol: "Ne" },
];

@Component({
	selector: "app-kampfrichter",
	templateUrl: "./kampfrichter.component.html",
	styleUrls: ["./kampfrichter.component.sass"],
})
export class KampfrichterComponent implements OnInit {
	@ViewChild("table") table: OlympiaTableComponent | null = null;
	public columns: Column[] = [
		{ name: "email", label: "Email" },
		{ name: "vorname", label: "Vorname" },
		{ name: "nachname", label: "Nachname" },
	];
	public data = ELEMENT_DATA;

	constructor(
		private kampfrichterService: KampfrichterService,
		private notifier: NotifierService,
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	private loadData(): void {
		this.table?.showLoadingAnimation();
		this.kampfrichterService.getKampfrichter().subscribe({
			next: () => {
				this.data = this.kampfrichterService.kampfrichter;
				this.table?.hideLoadingAnimation();
			},
			error: (error) => {
				this.showErrorMessage(error.error.message);
				this.table?.hideLoadingAnimation();
			},
		});
	}

	private showErrorMessage(error: string): void {
		this.notifier.notify(Notification.ERROR, error);
	}
}
