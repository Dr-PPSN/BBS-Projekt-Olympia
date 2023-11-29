import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MedaillenspiegelComponent } from "./medaillenspiegel/medaillenspiegel.component";
import { NgChartsModule } from "ng2-charts";
import { MedaillenspiegelRoutingModule } from "./medaillenspiegel-routing.module";

@NgModule({
	declarations: [MedaillenspiegelComponent],
	imports: [CommonModule, NgChartsModule, MedaillenspiegelRoutingModule],
})
export class MedaillenspiegelModule {}
