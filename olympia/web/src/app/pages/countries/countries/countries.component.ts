import { Component } from "@angular/core";
import { ChartType } from "angular-google-charts";

@Component({
	selector: "countries",
	templateUrl: "./countries.component.html",
	styleUrls: ["./countries.component.sass"],
})
export class CountriesComponent {
	ChartType = ChartType;
	chartData = [
		["South America", 600],
		["Canada", 500],
		["France", 600],
		["Russia", 700],
		["Australia", 600],
	];
	chartColumns = ["City", "Inhabitants"];
	geoChartOptions = {
		backgroundColor: "#81d4fa",
		legend: "none",
		region: "world",
		enableRegionInteractivity: true,
	};

	onSelect(event: any) {
		console.log(event);
	}
}
