import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SportsResultsRoutingModule } from "./sports-results-routing.module";
import { SportsResultsComponent } from "./sports-results/sports-results.component";
import { SportsResultsDisciplineComponent } from "./sports-results/sports-results-discipline/sports-results-discipline.component";

@NgModule({
	declarations: [SportsResultsComponent, SportsResultsDisciplineComponent],
	imports: [CommonModule, SportsResultsRoutingModule],
})
export class SportsResultsModule {}
