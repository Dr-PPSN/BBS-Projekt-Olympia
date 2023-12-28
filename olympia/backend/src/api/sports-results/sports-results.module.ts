import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Athlete } from "./entity/athlete.entity";
import { Discipline } from "./entity/discipline.entity";
import { SportsResult } from "./entity/sports_result.entity";
import { SportsResultsController } from "./sports-results.controller";
import { SportsResultsService } from "./sports-results.service";

@Module({
	imports: [TypeOrmModule.forFeature([Discipline, SportsResult, Athlete])],
	providers: [SportsResultsService],
	controllers: [SportsResultsController],
})
export class SportsResultsModule {}
