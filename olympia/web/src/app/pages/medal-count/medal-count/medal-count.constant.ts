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
		export const TITLE = "Silver";
		export const COLOR = "silver";
	}

	export namespace Bronze {
		export const TITLE = "Bronze";
		export const COLOR = "#CD7F32";
	}
}

export const TEST_DATA = {
	medalCount: [
		{
			country: "DEU",
			gold: 10,
			silver: 10,
			bronze: 10,
		},
		{
			country: "RUS",
			gold: 7,
			silver: 7,
			bronze: 7,
		},
		{
			country: "USA",
			gold: 6,
			silver: 6,
			bronze: 6,
		},
		{
			country: "NOR",
			gold: 5,
			silver: 5,
			bronze: 5,
		},
		{
			country: "ITA",
			gold: 4,
			silver: 4,
			bronze: 4,
		},
	],
};
