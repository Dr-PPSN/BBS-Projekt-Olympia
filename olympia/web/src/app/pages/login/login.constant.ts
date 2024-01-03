export namespace Formular {
	export const NAME = "formular";

	export namespace Email {
		export const NAME = "email";
		export const TYPE = "email";
		export const PLACEHOLDER = "Email";
	}

	export namespace Password {
		export const NAME = "password";
		export const TYPE = "password";
		export const PLACEHOLDER = "Passwort";
	}

	export namespace PasswordRepeat {
		export const NAME = "passwordRepeat";
		export const TYPE = "password";
		export const PLACEHOLDER = "Passwort wiederholen";
	}
}

export namespace Api {
	export const LOGIN = "auth/login";
	export const REQUEST_PASSWORD_RESET = "auth/request-change-password";
	export const CHANGE_PASSWORD = "auth/change-password";
}
