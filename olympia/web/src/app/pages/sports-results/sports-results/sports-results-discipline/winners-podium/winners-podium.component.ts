import { Component, Input } from "@angular/core";

@Component({
	selector: "winners-podium",
	templateUrl: "./winners-podium.component.html",
	styleUrl: "./winners-podium.component.sass",
})
export class WinnersPodiumComponent {
	@Input() discipline: string | null = null;
	@Input() gender: string | null = null;
}
