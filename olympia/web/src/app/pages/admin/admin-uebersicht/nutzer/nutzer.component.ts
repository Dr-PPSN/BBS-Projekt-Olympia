import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { NotifierService } from "angular-notifier";
import {
	Column,
	OlympiaTableComponent,
} from "../../../../components/olympia-table/olympia-table.component";
import { Notification } from "../../../../notifications/notification.constant";
import { NutzerService } from "./nutzer.service";

@Component({
	selector: "app-nutzer",
	templateUrl: "./nutzer.component.html",
	styleUrls: ["./nutzer.component.sass"],
})
export class NutzerComponent implements AfterViewInit {
	@ViewChild("table") table: OlympiaTableComponent | null = null;
	public columns: Column[] = [
		{ name: "email", label: "Email" },
		{ name: "vorname", label: "Vorname" },
		{ name: "nachname", label: "Nachname" },
		{ name: "istAdmin", label: "istAdmin" },
	];
	public data = [];

	constructor(
		private nutzerService: NutzerService,
		private notifier: NotifierService,
	) {}

	ngAfterViewInit(): void {
		this.loadData();
	}

	private loadData(): void {
		this.table?.showLoadingAnimation();
		this.nutzerService.getNutzer().subscribe({
			next: () => {
				this.data = this.nutzerService.nutzer;
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
