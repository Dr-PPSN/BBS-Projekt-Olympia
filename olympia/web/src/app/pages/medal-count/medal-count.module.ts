import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgChartsModule } from "ng2-charts";
import { MedalCountRoutingModule } from "./medal-count-routing.module";
import { MedalCountComponent } from "./medal-count/medal-count.component";
import { MedalCountService } from "./medal-count/medal-count.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
	declarations: [MedalCountComponent],
	imports: [
		CommonModule,
		NgChartsModule,
		MedalCountRoutingModule,
		MatProgressSpinnerModule,
	],
	providers: [MedalCountService],
})
export class MedalCountModule {}
