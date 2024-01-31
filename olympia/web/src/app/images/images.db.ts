import { SafeUrl } from "@angular/platform-browser";
import Dexie, { Table } from "dexie";

export interface Image {
	id?: string;
	uuid: string;
	filename: string;
	file: Blob;
	lastModified: Date;
	safeUrl?: SafeUrl;
}

export class AppDB extends Dexie {
	images!: Table<Image, string>;

	constructor() {
		super("ngdexieliveQuery");
		this.version(3).stores({
			images: "uuid, filename",
		});
	}

	async resetDatabase() {
		await db.transaction("rw", "images", () => {
			this.images.clear();
		});
	}
}

export const db = new AppDB();
