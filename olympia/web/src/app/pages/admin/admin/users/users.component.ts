import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { NotifierService } from "angular-notifier";
import {
	Column,
	OlympiaTableComponent,
} from "../../../../components/olympia-table/olympia-table.component";
import { Notification } from "../../../../notifications/notification.constant";
import { UserService } from "./users.service";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.sass"],
})
export class UsersComponent implements AfterViewInit {
	@ViewChild("table") table: OlympiaTableComponent | null = null;
	public columns: Column[] = [
		{ name: "email", label: "Email" },
		{ name: "firstName", label: "Vorname" },
		{ name: "lastName", label: "Nachname" },
		{ name: "isAdmin", label: "istAdmin" },
	];
	public data = [];

	constructor(
		private userService: UserService,
		private notifier: NotifierService,
	) {}

	ngAfterViewInit(): void {
		this.loadData();
	}

	private loadData(): void {
		this.table?.showLoadingAnimation();
		this.userService.getUsers().subscribe({
			next: () => {
				this.data = this.userService.users;
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
