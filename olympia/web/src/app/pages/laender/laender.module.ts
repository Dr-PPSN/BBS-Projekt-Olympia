import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LaenderRoutingModule } from "./laender-routing.module";
import { GoogleChartsModule } from "angular-google-charts";
import { LaenderUebersichtComponent } from "./laender-uebersicht/laender-uebersicht.component";

@NgModule({
	declarations: [LaenderUebersichtComponent],
	imports: [CommonModule, LaenderRoutingModule, GoogleChartsModule],
})
export class LaenderModule {}
