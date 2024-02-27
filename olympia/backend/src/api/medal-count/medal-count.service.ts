import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { Athlete } from "../sports-results/entity/athlete.entity";
import { SportsResult } from "../sports-results/entity/sports_result.entity";
import { readFile } from "./medal-count.dist";

@Injectable()
export class MedalCountService {
	constructor(@InjectDataSource() private dataSource: DataSource) {}

	async getMedalCount() {
		console.log(await readFile("src/api/medal-count/sql/medal-count.sql"));
		console.log(
			await this.dataSource.manager.query(
				await readFile(
					"/Users/veridian/Projekte/BBS-Projekt-Olympia/olympia/backend/src/api/medal-count/sql",
				),
				["gold", "silver", "bronze"],
			),
		);

		return await this.dataSource.manager.query(
			await readFile("sql/medal-count.sql"),
			["gold", "silver", "bronze"],
		);
		// return {
		// 	medalCount: await this.dataSource
		// 		.createQueryBuilder()
		// 		.select("athlete.country", "country")
		// 		.addSelect(
		// 			"COUNT(CASE WHEN sports_result.medal = :gold THEN 1 END)",
		// 			"gold",
		// 		)
		// 		.addSelect(
		// 			"COUNT(CASE WHEN sports_result.medal = :silver THEN 1 END)",
		// 			"silver",
		// 		)
		// 		.addSelect(
		// 			"COUNT(CASE WHEN sports_result.medal = :bronze THEN 1 END)",
		// 			"bronze",
		// 		)
		// 		.from(Athlete, "athlete")
		// 		.leftJoin(
		// 			SportsResult,
		// 			"sports_result",
		// 			"athlete.uuid = sports_result.athleteUuid",
		// 		)
		// 		.groupBy("athlete.country")
		// 		.orderBy(
		// 			"count (CASE WHEN sports_result.medal is not null THEN 1 END)",
		// 			"DESC",
		// 		)
		// 		.addOrderBy(
		// 			"count (CASE WHEN sports_result.medal = :gold THEN 1 END)",
		// 			"DESC",
		// 		)
		// 		.addOrderBy(
		// 			"count (CASE WHEN sports_result.medal = :silver THEN 1 END)",
		// 			"DESC",
		// 		)
		// 		.addOrderBy(
		// 			"count (CASE WHEN sports_result.medal = :bronze THEN 1 END)",
		// 			"DESC",
		// 		)
		// 		.setParameter("gold", "gold")
		// 		.setParameter("silver", "silver")
		// 		.setParameter("bronze", "bronze")
		// 		.getRawMany(),
		// };
	}

	async getMedalCountByCountry(country: string) {
		console.log("country", country);
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
				.where("athlete.country = :country", {
					country: country.toLocaleUpperCase(),
				})
				.groupBy("athlete.country")
				.orderBy(
					"count (CASE WHEN sports_result.medal is not null THEN 1 END)",
					"DESC",
				)
				.addOrderBy(
					"count (CASE WHEN sports_result.medal = :gold THEN 1 END)",
					"DESC",
				)
				.addOrderBy(
					"count (CASE WHEN sports_result.medal = :silver THEN 1 END)",
					"DESC",
				)
				.addOrderBy(
					"count (CASE WHEN sports_result.medal = :bronze THEN 1 END)",
					"DESC",
				)
				.setParameter("gold", "gold")
				.setParameter("silver", "silver")
				.setParameter("bronze", "bronze")
				.getRawOne(),
		};
	}
}
