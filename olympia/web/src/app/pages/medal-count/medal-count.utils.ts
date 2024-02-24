import { getCountryName } from "../../utils/country.utils";
import { Medals } from "./medal-count.constant";
import { MedalCount } from "./medal-count/medal-count.component";

export function getCountries(medalCount: MedalCount[]) {
	return medalCount.map((entry: { country: string }) =>
		getCountryName(entry.country),
	);
}

export function getMedalCountData(medalCount: MedalCount[]) {
	return [
		{
			data: medalCount.map((entry: { gold: number }) => entry.gold),
			label: Medals.Gold.TITLE,
			backgroundColor: Medals.Gold.COLOR,
		},
		{
			data: medalCount.map((entry: { silver: number }) => entry.silver),
			label: Medals.Silver.TITLE,
			backgroundColor: Medals.Silver.COLOR,
		},
		{
			data: medalCount.map((entry: { bronze: number }) => entry.bronze),
			label: Medals.Bronze.TITLE,
			backgroundColor: Medals.Bronze.COLOR,
		},
	];
}

export function calculateChartHeight(dataLength: number): number {
	return 60 + dataLength * 35;
}
