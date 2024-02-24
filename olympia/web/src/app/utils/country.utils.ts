import * as i18nIsoCountries from "i18n-iso-countries";

export function getAllCountries() {
	i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));
	const countries = i18nIsoCountries.getNames("de", { select: "official" });
	return Object.entries(countries).map(([key, value]) => value);
}

export function getCountryName(countryCode: string) {
	i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));
	return i18nIsoCountries.getName(countryCode.toLowerCase(), "de", {
		select: "official",
	});
}

export function getCountryCode(country: string) {
	i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/de.json"));
	return i18nIsoCountries.getAlpha3Code(country, "de")?.toLocaleLowerCase();
}
