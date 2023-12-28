
import { Component, Input, OnInit } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";

export interface Column {
	name: string;
	label: string;
}

@Component({
	selector: "olympia-table",
	templateUrl: "./olympia-table.component.html",
	styleUrls: ["./olympia-table.component.sass"],
	standalone: true,
	imports: [MatTableModule, MatProgressSpinnerModule],
})
export class OlympiaTableComponent implements OnInit {
	@Input() public displayedColumns: Column[] = [];
	// biome-ignore lint/suspicious/noExplicitAny: muss any sein
	@Input() public data: any[] = [];

	public loadingAnimationIsActive = false;

	ngOnInit(): void {}

	// biome-ignore lint/suspicious/noExplicitAny: muss any sein
	public getKeys(objectArray: Array<any>, key: string): string[] {
		return objectArray.map((object) => object[key]);
	}

	public showLoadingAnimation(): void {
		this.loadingAnimationIsActive = true;
	}

	public hideLoadingAnimation(): void {
		this.loadingAnimationIsActive = false;
	}
}
