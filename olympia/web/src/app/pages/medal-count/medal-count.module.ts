import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgChartsModule } from "ng2-charts";
import { MedalCountRoutingModule } from "./medal-count-routing.module";
import { MedalCountService } from "./medal-count.service";
import { MedalCountComponent } from "./medal-count/medal-count.component";

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
