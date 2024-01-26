import { Controller, Get, Param, StreamableFile } from "@nestjs/common";
import { ImageService } from "./image.service";
import { Api } from "./image.constant";

@Controller(Api.TITLE)
export class ImageController {
	constructor(private imageService: ImageService) {}

	@Get(Api.UUID)
	async getImage(
		@Param() params: { imageUuid: string },
	): Promise<StreamableFile> {
		const image = await this.imageService.findOne(params.imageUuid);
		return new StreamableFile(image.file, {
			type: image.mimeType,
			disposition: `inline; filename=${image.filename}`,
			length: image.filesizeInByte,
		});
	}
}
