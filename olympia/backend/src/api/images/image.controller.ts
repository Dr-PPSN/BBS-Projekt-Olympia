import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { Response } from "express";
import { Api, ResponseHeader } from "./image.constant";
import { ImageService } from "./image.service";

@Controller(Api.TITLE)
export class ImageController {
	constructor(private imageService: ImageService) {}

	@Get(Api.UUID)
	async getImage(
		@Param() params: { uuid: string },
		@Res({ passthrough: true }) res: Response,
	): Promise<StreamableFile> {
		const image = await this.imageService.findOne(params.uuid);
		res.appendHeader(ResponseHeader.LAST_MODIFIED, image.lastModified.toJSON());
		return new StreamableFile(image.file, {
			type: image.mimeType,
			disposition: `inline; filename=${image.filename}`,
			length: image.filesizeInByte,
		});
	}

	@Get(Api.UUID + Api.LAST_MODIFIED)
	async getLastModified(
		@Param() params: { uuid: string },
	): Promise<{ lastModified: string }> {
		const image = await this.imageService.findOne(params.uuid);
		return { lastModified: image.lastModified.toJSON() };
	}
}
