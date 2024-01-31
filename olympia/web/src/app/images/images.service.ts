import { Injectable } from "@angular/core";
import { Image, db } from "./images.db";
import * as _ from "lodash";
import { createImageFromResponse } from "./images.utils";
import { HttpService } from "../service/http/http.service";
import { firstValueFrom } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ImagesService {
	constructor(private httpService: HttpService) {}

	async getImage(uuid: string): Promise<Image | undefined> {
		const imageFromIndexedDB = await this.getImageFromIndexedDB(uuid);
		if (!imageFromIndexedDB) {
			console.log("Image not found in indexedDB -", uuid);
			return await this.loadImageDataFromApi(uuid);
		}
		if (await this.isImageUpToDate(imageFromIndexedDB, uuid)) {
			console.log("Image is up to date -", uuid);
			return imageFromIndexedDB;
		}
		console.log("Image is not up to date, gets reloaded -", uuid);
		return await this.loadImageDataFromApi(uuid);
	}

	private async getImageFromIndexedDB(uuid: string) {
		return await db.images.get({ uuid });
	}

	private async isImageUpToDate(imageFromIndexedDB: Image, uuid: string) {
		const lastModifiedFromApi = await this.getLastModified(uuid);
		return imageFromIndexedDB.lastModified >= lastModifiedFromApi;
	}

	private async getLastModified(uuid: string): Promise<Date> {
		const response: { lastModified: string } = await firstValueFrom(
			this.httpService.getData(`/image/${uuid}/last-modified`),
		);
		return new Date(response.lastModified);
	}

	private async loadImageDataFromApi(uuid: string) {
		const res: Response = await fetch(`api/image/${uuid}`);
		const image: Image = await createImageFromResponse(res, uuid);
		this.addOrUpdateImage(image);
		return image;
	}

	private async addOrUpdateImage(image: Image) {
		const copyOfImage = this.removeSafeUrl(image);
		await db.images.put(copyOfImage, image.uuid);
	}

	private removeSafeUrl(image: Image) {
		const copyOfImage = _.cloneDeep(image);
		copyOfImage.safeUrl = undefined;
		return copyOfImage;
	}
}
