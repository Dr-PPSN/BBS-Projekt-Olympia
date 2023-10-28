import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Athlet } from "./entity/athlet.entity";
import { Ergebnis } from "./entity/ergebnis.entity";
import { Sportart } from "./entity/sportart.entity";
import { ErgebnisseController } from "./ergebnisse.controller";
import { ErgebnisseService } from "./ergebnisse.service";

@Module({
	imports: [TypeOrmModule.forFeature([Sportart, Ergebnis, Athlet])],
	providers: [ErgebnisseService],
	controllers: [ErgebnisseController],
})
export class ErgebnisseModule {}
