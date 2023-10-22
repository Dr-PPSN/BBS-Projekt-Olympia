export const LOCAL_STORAGE_KEY_JWT = "jwtToken";
export const LOGIN_ROUTE = "/login";

export function getToken(): string | null {
	return localStorage.getItem(LOCAL_STORAGE_KEY_JWT);
}
