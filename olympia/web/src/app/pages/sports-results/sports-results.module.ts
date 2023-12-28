import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SportsResultsRoutingModule } from "./sports-results-routing.module";
import { LaufenComponent } from "./sports-results/laufen/laufen.component";
import { SchwimmenComponent } from "./sports-results/schwimmen/schwimmen.component";
import { SportsResultsComponent } from "./sports-results/sports-results.component";
import { SpringreitenComponent } from "./sports-results/springreiten/springreiten.component";
import { WeitsprungComponent } from "./sports-results/weitsprung/weitsprung.component";

@NgModule({
	declarations: [
		SportsResultsComponent,
		WeitsprungComponent,
		LaufenComponent,
		SpringreitenComponent,
		SchwimmenComponent,
	],
	imports: [CommonModule, SportsResultsRoutingModule],
})
export class SportsResultsModule {}
