import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NotifierModule } from "angular-notifier";
import { OlympiaTableComponent } from "../../components/olympia-table/olympia-table.component";
import { notifierOptions } from "../../notifications/notification.constant";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminUebersichtComponent } from "./admin-uebersicht/admin-uebersicht.component";
import { AthletenComponent } from "./admin-uebersicht/athleten/athleten.component";
import { NutzerComponent } from "./admin-uebersicht/nutzer/nutzer.component";

@NgModule({
	declarations: [AdminUebersichtComponent, NutzerComponent, AthletenComponent],
	imports: [
		CommonModule,
		AdminRoutingModule,
		OlympiaTableComponent,
		NotifierModule.withConfig(notifierOptions),
	],
})
export class AdminModule {}
