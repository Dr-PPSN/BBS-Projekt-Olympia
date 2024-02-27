import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { OlympiaTableComponent } from "../../components/olympia-table/olympia-table.component";
import { SportsResultsRoutingModule } from "./sports-results-routing.module";
import { SportsResultsService } from "./sports-results.service";
import { SportsResultsDisciplineComponent } from "./sports-results/sports-results-discipline/sports-results-discipline.component";
import { WinnersPodiumComponent } from "./sports-results/sports-results-discipline/winners-podium/winners-podium.component";
import { SportsResultsComponent } from "./sports-results/sports-results.component";
import { OlympiaImageComponent } from "../../components/olympia-image/olympia-image.component";

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
		MatProgressSpinnerModule,
		OlympiaTableComponent,
		OlympiaImageComponent,
	],
	providers: [SportsResultsService],
})
export class SportsResultsModule {}
