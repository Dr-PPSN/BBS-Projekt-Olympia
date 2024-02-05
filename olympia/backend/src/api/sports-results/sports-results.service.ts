import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Athlete, Gender } from "./entity/athlete.entity";

@Injectable()
export class SportsResultsService {
	constructor(
		@InjectRepository(Athlete) private athleteRepository: Repository<Athlete>,
	) {}

	async getSportsResults(discipline: string) {
		return {
			male: await this.athleteRepository.find({
				select: {
					uuid: true,
					firstName: true,
					lastName: true,
					country: true,
					sportsResult: {
						value: true,
						medal: true,
					},
					image: {
						uuid: true,
					},
				},
				relations: {
					sportsResult: true,
					image: true,
				},
				where: {
					gender: Gender.MALE,
					discipline: {
						routeParameter: discipline,
					},
				},
			}),
			female: await this.athleteRepository.find({
				select: {
					uuid: true,
					firstName: true,
					lastName: true,
					country: true,
					sportsResult: {
						value: true,
						medal: true,
					},
					image: {
						uuid: true,
					},
				},
				relations: {
					sportsResult: true,
					image: true,
				},
				where: {
					gender: Gender.FEMALE,
					discipline: {
						routeParameter: discipline,
					},
				},
			}),
		};
	}
}
