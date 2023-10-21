export const LOCAL_STORAGE_KEY_JWT = "jwtToken";

export function getToken(): string | null {
	return localStorage.getItem(LOCAL_STORAGE_KEY_JWT);
}
