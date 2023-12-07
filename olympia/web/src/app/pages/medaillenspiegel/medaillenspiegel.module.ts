import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgChartsModule } from "ng2-charts";
import { MedaillenspiegelRoutingModule } from "./medaillenspiegel-routing.module";
import { MedaillenspiegelComponent } from "./medaillenspiegel/medaillenspiegel.component";

@NgModule({
	declarations: [MedaillenspiegelComponent],
	imports: [CommonModule, NgChartsModule, MedaillenspiegelRoutingModule],
})
export class MedaillenspiegelModule {}
