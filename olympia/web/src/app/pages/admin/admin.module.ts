import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OlympiaFileUploadComponent } from "../../components/olympia-file-upload/olympia-file-upload.component";
import { OlympiaImageComponent } from "../../components/olympia-image/olympia-image.component";
import { OlympiaTableComponent } from "../../components/olympia-table/olympia-table.component";
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
		OlympiaFileUploadComponent,
		OlympiaImageComponent,
	],
})
export class AdminModule {}
