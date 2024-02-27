import * as i18nIsoCountries from "i18n-iso-countries";

export function getDisciplineFromRouteParameter(
	routeParameter: string,
): string {
	switch (routeParameter) {
		case "weitsprung":
			return "Weitsprung";
		case "100m-lauf":
			return "100m-Lauf";
		case "springreiten":
			return "Springreiten";
		case "schwimmen":
			return "Schwimmen";
		default:
			return "";
	}
}

export function getDisciplineUnit(discipline: string | null): string {
	switch (discipline) {
		case "weitsprung":
			return "m";
		case "100m-lauf":
			return "s";
		case "springreiten":
			return "Fehlerpunkt(e)";
		case "schwimmen":
			return "s";
		default:
			return "";
	}
}

export function getCountryName(countryCode: string): string | undefined {
	i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));
	return i18nIsoCountries.getName(countryCode.toLowerCase(), "de", {
		select: "official",
	});
}

export function getFlagIconClass(countryCode: string): string {
	i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));
	const alpha2 = i18nIsoCountries.alpha3ToAlpha2(countryCode);
	if (!alpha2) {
		return "";
	}
	return `fi-${alpha2.toLowerCase()}`;
}
