import { Injectable } from "@nestjs/common";
import { ImageService } from "../../images/image.service";
import { Image } from "../../images/entity/image.entity";
import { Repository } from "typeorm";
import { Athlete } from "../../sports-results/entity/athlete.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AthleteService {
	constructor(
		@InjectRepository(Athlete) private athleteRepository: Repository<Athlete>,
		private imageService: ImageService,
	) {}

	async updateAthleteImage(athleteUuid: string, file: Express.Multer.File) {
		const athlete = await this.athleteRepository.findOneOrFail({
			where: { uuid: athleteUuid },
			relations: {
				image: true,
			},
		});
		await this.deleteOldImage(athlete.image);
		athlete.image = await this.saveImage(file);
		await this.athleteRepository.save(athlete);
	}

	private async deleteOldImage(image: Image) {
		if (image) {
			await this.imageService.deleteImage(image);
		}
	}

	private saveImage(file: Express.Multer.File) {
		const image = new Image(file);
		return this.imageService.saveImage(image);
	}
}
