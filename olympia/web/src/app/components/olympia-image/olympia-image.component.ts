import { Component, Input } from "@angular/core";
import { Image } from "../../images/images.db";
import { ImagesModule } from "../../images/images.module";
import { ImagesService } from "../../images/images.service";
import { ensureIsImageType } from "./olympia-image.utils";

@Component({
	standalone: true,
	selector: "olympia-image",
	templateUrl: "./olympia-image.component.html",
	styleUrl: "./olympia-image.component.sass",
	imports: [ImagesModule],
})
export class OlympiaImageComponent {
	private _uuid: string | undefined;
	@Input() set uuid(value: string) {
		if (!value || value === this._uuid) {
			return;
		}
		this._uuid = value;
		this.getImage();
	}
	get uuid(): string | undefined {
		return this._uuid;
	}
	@Input() defaultImagePath: string | undefined;
	image: Image | undefined;

	constructor(private imagesService: ImagesService) {}

	private async getImage() {
		if (!this._uuid) return;
		this.image = await this.imagesService.getImage(this._uuid);
		this.updateImageObjectURL();
	}

	private updateImageObjectURL() {
		if (!this.image) return;
		ensureIsImageType(this.image.file);
		this.image.safeUrl = URL.createObjectURL(this.image.file);
	}

	defaultImagePathIsSet() {
		return this.defaultImagePath !== undefined;
	}
}
