import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Image } from "./entity/image.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImageService {
	constructor(
		@InjectRepository(Image) private imageRepository: Repository<Image>,
	) {}

	findOne(uuid: string): Promise<Image> {
		return this.imageRepository.findOneOrFail({ where: { uuid } });
	}

	async saveImage(image: Image): Promise<Image> {
		return await this.imageRepository.save(image);
	}

	async deleteImage(image: Image) {
		await this.imageRepository.delete({ uuid: image.uuid });
	}
}
