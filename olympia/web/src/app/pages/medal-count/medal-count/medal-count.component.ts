import { HttpErrorResponse } from "@angular/common/http";
import { Component, signal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DiagramSettings } from "../medal-count.constant";
import { MedalCountService } from "../medal-count.service";
import { getCountries, getMedalCountData } from "../medal-count.utils";

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
	loadingAnimationIsActive = signal(true);

	constructor(
		public medalCountService: MedalCountService,
		private toastrService: ToastrService,
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

	dataIsLoaded(): boolean {
		return this.data.length !== 0;
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
}
