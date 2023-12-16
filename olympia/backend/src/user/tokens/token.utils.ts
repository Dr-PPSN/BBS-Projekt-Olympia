export function getTokenExpirationDate(maxTokenAgeInSeconds: number): Date {
	const expirationDate = new Date();
	expirationDate.setSeconds(expirationDate.getSeconds() + maxTokenAgeInSeconds);
	return expirationDate;
}
