import { Component, Input } from "@angular/core";

export interface WinnersPodiumAthlete {
	uuid: string;
	name: string;
	country: string;
	sportsResult: string;
}
export interface WinnersPodium {
	gold: WinnersPodiumAthlete | undefined;
	silver: WinnersPodiumAthlete | undefined;
	bronze: WinnersPodiumAthlete | undefined;
}

@Component({
	selector: "winners-podium",
	templateUrl: "./winners-podium.component.html",
	styleUrl: "./winners-podium.component.sass",
})
export class WinnersPodiumComponent {
	@Input() winners: WinnersPodium | undefined = undefined;

	someWinnersAreDefined(): boolean {
		return (
			this.winners?.gold !== undefined ||
			this.winners?.silver !== undefined ||
			this.winners?.bronze !== undefined
		);
	}
}
