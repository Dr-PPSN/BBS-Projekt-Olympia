import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ImageService } from "../../images/image.service";
import { Athlete } from "../../sports-results/entity/athlete.entity";
import { Image } from "../../images/entity/image.entity";

@Injectable()
export class AthleteService {
	constructor(
		@InjectRepository(Athlete) private athleteRepository: Repository<Athlete>,
		private imageService: ImageService,
	) {}

	async updateAthleteImage(athleteUuid: string, file: Express.Multer.File) {
		if (!athleteUuid) throw new Error("No athlete uuid provided");
		const athlete = await this.athleteRepository.findOneOrFail({
			where: { uuid: athleteUuid },
			relations: {
				image: true,
			},
		});
		if (!athlete.image) {
			athlete.image = await this.createNewImage(file);
			await this.athleteRepository.save(athlete);
			return;
		}
		athlete.image.updateImageData(file);
		await this.imageService.saveImage(athlete.image);
	}

	private async createNewImage(file: Express.Multer.File) {
		const image = new Image(file);
		return await this.imageService.saveImage(image);
	}
}
