import { Component } from "@angular/core";
import { ChartType } from "angular-google-charts";

@Component({
	selector: "countries",
	templateUrl: "./countries.component.html",
	styleUrls: ["./countries.component.sass"],
})
export class CountriesComponent {
	public ChartType = ChartType;
	public chartData = [
		["London", 8136000],
		["New York", 8538000],
		["Paris", 2244000],
		["Berlin", 3470000],
		["Kairo", 19500000],
	];
}
