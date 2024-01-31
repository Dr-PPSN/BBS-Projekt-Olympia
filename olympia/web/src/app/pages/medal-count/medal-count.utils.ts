import * as i18nIsoCountries from "i18n-iso-countries";
import { Medals } from "./medal-count.constant";

export function getCountries(data: { medalCount: { country: string }[] }) {
	return data.medalCount.map((entry: { country: string }) =>
		getCountryName(entry.country),
	);
}

function getCountryName(countryCode: string) {
	i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));
	return i18nIsoCountries.getName(countryCode.toLowerCase(), "de", {
		select: "official",
	});
}

export function getMedalCountData(data: {
	medalCount: { gold: number; silver: number; bronze: number }[];
}) {
	return [
		{
			data: data.medalCount.map((entry: { gold: number }) => entry.gold),
			label: Medals.Gold.TITLE,
			backgroundColor: Medals.Gold.COLOR,
		},
		{
			data: data.medalCount.map((entry: { silver: number }) => entry.silver),
			label: Medals.Silver.TITLE,
			backgroundColor: Medals.Silver.COLOR,
		},
		{
			data: data.medalCount.map((entry: { bronze: number }) => entry.bronze),
			label: Medals.Bronze.TITLE,
			backgroundColor: Medals.Bronze.COLOR,
		},
	];
}

export function calculateChartHeight(dataLength: number): number {
	return 60 + dataLength * 35;
}
