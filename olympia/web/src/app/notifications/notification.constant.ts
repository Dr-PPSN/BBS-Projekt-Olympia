import { NotifierOptions } from "angular-notifier";

export namespace Notification {
	export const DEFAULT = "default";
	export const ERROR = "error";
	export const SUCCESS = "success";
	export const INFO = "info";
	export const WARNING = "warning";
}

export const notifierOptions: NotifierOptions = {
	position: {
		horizontal: {
			position: "right",
			distance: 12,
		},
		vertical: {
			position: "bottom",
			distance: 70,
			gap: 10,
		},
	},
	theme: "material",
	behaviour: {
		autoHide: 3000,
		onClick: "hide",
		onMouseover: "pauseAutoHide",
		showDismissButton: true,
		stacking: 4,
	},
	animations: {
		enabled: true,
		show: {
			preset: "slide",
			speed: 300,
			easing: "ease",
		},
		hide: {
			preset: "fade",
			speed: 300,
			easing: "ease",
			offset: 50,
		},
		shift: {
			speed: 300,
			easing: "ease",
		},
		overlap: 150,
	},
};
