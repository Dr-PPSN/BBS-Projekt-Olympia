import { Component } from "@angular/core";
import { DiagramSettings, TEST_DATA } from "../medal-count.constant";
import { MedalCountService } from "../medal-count.service";
import { getCountries, getMedalCountData } from "../medal-count.utils";
import { NotifierService } from "angular-notifier";
import { Notification } from "../../../notifications/notification.constant";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
	selector: "app-medaillenspiegel",
	templateUrl: "./medal-count.component.html",
	styleUrls: ["./medal-count.component.sass"],
})
export class MedalCountComponent {
	DiagramSettings = DiagramSettings;

	labels: Array<string | undefined> = [];
	data: {
		data: number[];
		label: string;
		backgroundColor: string;
	}[] = [];
	loadingAnimationIsActive = true;

	constructor(
		public medalCountService: MedalCountService,
		private notifier: NotifierService,
	) {}

	ngOnInit(): void {
		this.loadMedalCount();
	}

	loadMedalCount() {
		this.labels = [];
		this.data = [];

		this.showLoadingAnimation();
		this.medalCountService.getMedalCount().subscribe({
			next: (data) => {
				this.labels = getCountries(data);
				this.data = getMedalCountData(data);
				this.hideLoadingAnimation();
			},
			error: (error) => {
				this.showErrorNotification(error);
				this.hideLoadingAnimation();
			},
		});
	}

	public showLoadingAnimation(): void {
		this.loadingAnimationIsActive = true;
	}

	public hideLoadingAnimation(): void {
		this.loadingAnimationIsActive = false;
	}

	private showErrorNotification(error: HttpErrorResponse) {
		this.notifier.notify(Notification.ERROR, error.error);
	}
}
