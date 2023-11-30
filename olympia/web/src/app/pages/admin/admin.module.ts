import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { OlympiaTableComponent } from "../../components/olympia-table/olympia-table.component";
import { AdminUebersichtComponent } from "./admin-uebersicht/admin-uebersicht.component";
import { KampfrichterComponent } from "./admin-uebersicht/kampfrichter/kampfrichter.component";
import { AthletenComponent } from "./admin-uebersicht/athleten/athleten.component";
import { NotifierModule } from "angular-notifier";
import { notifierOptions } from "../../notifications/notification.constant";

@NgModule({
	declarations: [
		AdminUebersichtComponent,
		KampfrichterComponent,
		AthletenComponent,
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		OlympiaTableComponent,
		NotifierModule.withConfig(notifierOptions),
	],
})
export class AdminModule {}
