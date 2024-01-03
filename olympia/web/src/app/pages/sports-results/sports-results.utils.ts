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
