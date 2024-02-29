import { Injectable, NotFoundException } from "@nestjs/common";
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
				},
				relations: {
					sportsResult: true,
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
				},
				relations: {
					sportsResult: true,
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

	async saveSportsResult(athleteId: string, updatedData: any): Promise<Athlete> {
		// Finde den Athleten anhand der ID
		const athlete = await this.athleteRepository.findOne({ where: { uuid: athleteId } });

		if (!athlete) {
			throw new NotFoundException(`Athlete with ID ${athleteId} not found`);
		}

		this.athleteRepository.merge(athlete, updatedData);

		// Speichere die Änderungen in der Datenbank
		await this.athleteRepository.save(athlete);

		return athlete;
	}
}
