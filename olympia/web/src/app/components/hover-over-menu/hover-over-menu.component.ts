import { Component } from "@angular/core";
@Component({
	selector: "hover-over-menu",
	templateUrl: "./hover-over-menu.component.html",
	styleUrls: ["./hover-over-menu.component.sass"],
})
export class HoverOverMenuComponent {
	// biome-ignore lint: muss any sein
	timedOutCloser: any;

	// biome-ignore lint: muss any sein
	openMenu(trigger: any) {
		if (this.timedOutCloser) {
			clearTimeout(this.timedOutCloser);
		}
		trigger.openMenu();
	}

	// biome-ignore lint: muss any sein
	closeMenu(trigger: any) {
		this.timedOutCloser = setTimeout(() => {
			trigger.closeMenu();
		}, 50);
	}
}
