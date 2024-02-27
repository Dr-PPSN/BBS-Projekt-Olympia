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

export namespace Medals {
	export namespace Gold {
		export const TITLE = "Gold";
		export const COLOR = "gold";
	}
	export namespace Silver {
		export const TITLE = "Silber";
		export const COLOR = "silver";
	}
	export namespace Bronze {
		export const TITLE = "Bronze";
		export const COLOR = "#CD7F32";
	}
}
