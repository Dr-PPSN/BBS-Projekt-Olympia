import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ErgebnisseRoutingModule } from "./ergebnisse-routing.module";
import { ErgebnisseUebersichtComponent } from "./ergebnisse-uebersicht/ergebnisse-uebersicht.component";
import { LaufenComponent } from "./ergebnisse-uebersicht/laufen/laufen.component";
import { SchwimmenComponent } from "./ergebnisse-uebersicht/schwimmen/schwimmen.component";
import { SpringreitenComponent } from "./ergebnisse-uebersicht/springreiten/springreiten.component";
import { WeitsprungComponent } from "./ergebnisse-uebersicht/weitsprung/weitsprung.component";

@NgModule({
	declarations: [
		ErgebnisseUebersichtComponent,
		WeitsprungComponent,
		LaufenComponent,
		SpringreitenComponent,
		SchwimmenComponent,
	],
	imports: [CommonModule, ErgebnisseRoutingModule],
})
export class ErgebnisseModule {}
