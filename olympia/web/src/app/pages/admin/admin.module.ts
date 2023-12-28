import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NotifierModule } from "angular-notifier";
import { OlympiaTableComponent } from "../../components/olympia-table/olympia-table.component";
import { notifierOptions } from "../../notifications/notification.constant";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin/admin.component";
import { AthletesComponent } from "./admin/athletes/athletes.component";
import { UsersComponent } from "./admin/users/users.component";

@NgModule({
	declarations: [AdminComponent, UsersComponent, AthletesComponent],
	imports: [
		CommonModule,
		AdminRoutingModule,
		OlympiaTableComponent,
		NotifierModule.withConfig(notifierOptions),
	],
})
export class AdminModule {}
