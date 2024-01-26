import {
	Body,
	Controller,
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Api, FileValidation } from "./athlete.constant";
import { AthleteService } from "./athlete.service";

@Controller(Api.TITLE)
export class AthleteController {
	constructor(private athleteService: AthleteService) {}

	@Post(Api.UPDATE_IMAGE)
	@UseInterceptors(FileInterceptor("file"))
	updateAthleteImage(
		@Body() athlete: { refUuid: string },
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: FileValidation.MAX_FILE_SIZE }),
					new FileTypeValidator({ fileType: FileValidation.IMAGE_FILE_TYPE }),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		return this.athleteService.updateAthleteImage(athlete.refUuid, file);
	}
}
