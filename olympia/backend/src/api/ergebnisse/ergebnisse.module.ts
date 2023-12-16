import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Athlete } from "./entity/athlete.entity";
import { SportsResult } from "./entity/sports_result.entity";
import { Discipline } from "./entity/discipline.entity";
import { ErgebnisseController } from "./ergebnisse.controller";
import { ErgebnisseService } from "./ergebnisse.service";

@Module({
	imports: [TypeOrmModule.forFeature([Discipline, SportsResult, Athlete])],
	providers: [ErgebnisseService],
	controllers: [ErgebnisseController],
})
export class ErgebnisseModule {}
