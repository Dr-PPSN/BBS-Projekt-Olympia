import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NotifierModule } from "angular-notifier";
import { OlympiaTableComponent } from "../../components/olympia-table/olympia-table.component";
import { notifierOptions } from "../../notifications/notification.constant";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin/admin.component";
import { AthletenComponent } from "./admin/athleten/athleten.component";
import { NutzerComponent } from "./admin/nutzer/nutzer.component";

@NgModule({
	declarations: [AdminComponent, NutzerComponent, AthletenComponent],
	imports: [
		CommonModule,
		AdminRoutingModule,
		OlympiaTableComponent,
		NotifierModule.withConfig(notifierOptions),
	],
})
export class AdminModule {}
