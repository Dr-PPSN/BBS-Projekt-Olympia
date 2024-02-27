import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Image } from "./entity/image.entity";

@Injectable()
export class ImageService {
	constructor(
		@InjectRepository(Image) private imageRepository: Repository<Image>,
	) {}

	findOne(uuid: string): Promise<Image> {
		if (!uuid) {
			throw new Error("No image uuid provided");
		}
		return this.imageRepository.findOneOrFail({ where: { uuid } });
	}

	async saveImage(image: Image): Promise<Image> {
		return await this.imageRepository.save(image);
	}

	async deleteImage(image: Image) {
		await this.imageRepository.delete({ uuid: image.uuid });
	}
}
