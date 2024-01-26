export function getDisciplineFromRouteParameter(
	routeParameter: string,
): string {
	switch (routeParameter) {
		case "weitsprung":
			return "Weitsprung";
		case "100m-lauf":
			return "100m Lauf";
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
