import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MedaillenspiegelComponent } from "./medaillenspiegel/medaillenspiegel.component";
import { NgChartsModule } from "ng2-charts";

@NgModule({
	declarations: [MedaillenspiegelComponent],
	imports: [CommonModule, NgChartsModule],
})
export class MedaillenspiegelModule {}
