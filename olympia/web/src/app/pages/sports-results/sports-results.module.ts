import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SportsResultsRoutingModule } from "./sports-results-routing.module";
import { SportsResultsComponent } from "./sports-results/sports-results.component";
import { SportsResultsDisciplineComponent } from "./sports-results/sports-results-discipline/sports-results-discipline.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { WinnersPodiumComponent } from "./sports-results/sports-results-discipline/winners-podium/winners-podium.component";

@NgModule({
	declarations: [
		SportsResultsComponent,
		SportsResultsDisciplineComponent,
		WinnersPodiumComponent,
	],
	imports: [
		CommonModule,
		SportsResultsRoutingModule,
		MatButtonModule,
		MatExpansionModule,
	],
})
export class SportsResultsModule {}
