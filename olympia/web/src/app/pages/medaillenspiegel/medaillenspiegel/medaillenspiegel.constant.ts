import { ChartOptions, ChartType } from "chart.js";

export namespace DiagramSettings {
	export const TYPE: ChartType = "bar";
	export const LEGEND = true;
	export const OPTIONS: ChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: "y",
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			},
		},
	};
}
