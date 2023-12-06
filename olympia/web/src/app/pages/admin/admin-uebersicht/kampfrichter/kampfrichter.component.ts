import { AfterViewInit, Component, ViewChild } from "@angular/core";
import {
	Column,
	OlympiaTableComponent,
} from "../../../../components/olympia-table/olympia-table.component";
import { KampfrichterService } from "./kampfrichter.service";
import { NotifierService } from "angular-notifier";
import { Notification } from "../../../../notifications/notification.constant";

@Component({
	selector: "app-kampfrichter",
	templateUrl: "./kampfrichter.component.html",
	styleUrls: ["./kampfrichter.component.sass"],
})
export class KampfrichterComponent implements AfterViewInit {
	@ViewChild("table") table: OlympiaTableComponent | null = null;
	public columns: Column[] = [
		{ name: "email", label: "Email" },
		{ name: "vorname", label: "Vorname" },
		{ name: "nachname", label: "Nachname" },
		{ name: "istAdmin", label: "istAdmin" },
	];
	public data = [];

	constructor(
		private kampfrichterService: KampfrichterService,
		private notifier: NotifierService,
	) {}

	ngAfterViewInit(): void {
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
