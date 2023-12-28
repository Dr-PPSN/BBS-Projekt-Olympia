import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Athlete } from "../sports-results/entity/athlete.entity";
import { SportsResult } from "../sports-results/entity/sports_result.entity";

@Injectable()
export class MedalCountService {
	constructor(@InjectDataSource() private dataSource: DataSource) {}

	async getMedalCount() {
		return {
			medalCount: await this.dataSource
				.createQueryBuilder()
				.select("athlete.country", "country")
				.addSelect(
					"COUNT(CASE WHEN sports_result.medal = :gold THEN 1 END)",
					"gold",
				)
				.addSelect(
					"COUNT(CASE WHEN sports_result.medal = :silver THEN 1 END)",
					"silver",
				)
				.addSelect(
					"COUNT(CASE WHEN sports_result.medal = :bronze THEN 1 END)",
					"bronze",
				)
				.from(Athlete, "athlete")
				.leftJoin(
					SportsResult,
					"sports_result",
					"athlete.uuid = sports_result.athleteUuid",
				)
				.groupBy("athlete.country")
				.orderBy(
					"count (CASE WHEN sports_result.medal is not null THEN 1 END)",
					"DESC",
				)
				.setParameter("gold", "gold")
				.setParameter("silver", "silver")
				.setParameter("bronze", "bronze")
				.getRawMany(),
		};
	}
}
