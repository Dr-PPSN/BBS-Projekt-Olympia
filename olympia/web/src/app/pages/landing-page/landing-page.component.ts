import { Component } from "@angular/core";

@Component({
	selector: "landing-page",
	templateUrl: "./landing-page.component.html",
	styleUrls: ["./landing-page.component.sass"],
})
export class LandingPageComponent {
    verbleibendeTage = "";
	verbleibendeStunden = "";
	verbleibendeMinuten = "";
	verbleibendeSekunden = "";

    constructor() {
        this.refreshRemainingTime();
        setInterval(() => {
            this.refreshRemainingTime();
        }, 1000);
    }

    private refreshRemainingTime() {
		// Zukünftiges Datum (3. November 2024 um 19 Uhr)
		const zukuenftigesDatum = new Date('2024-11-03T19:00:00');

		// Aktuelles Datum
		const aktuellesDatum = new Date();

		// Differenz in Millisekunden berechnen
		const differenzInMS = zukuenftigesDatum.getTime() - aktuellesDatum.getTime();

		// Differenz in Tage, Stunden, Minuten und Sekunden umrechnen
		this.verbleibendeTage = Math.floor(differenzInMS / (1000 * 60 * 60 * 24)).toString();
		this.verbleibendeStunden = Math.floor((differenzInMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
		this.verbleibendeMinuten = Math.floor((differenzInMS % (1000 * 60 * 60)) / (1000 * 60)).toString();
		this.verbleibendeSekunden = Math.floor((differenzInMS % (1000 * 60)) / 1000).toString();
    }
}