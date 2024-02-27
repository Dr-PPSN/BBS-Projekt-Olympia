import { Image } from "./images.db";

export async function createImageFromResponse(
	response: Response,
	uuid: string,
): Promise<Image> {
	return {
		uuid,
		filename: getFilenameFromContentDispositionHeader(response),
		file: await response.blob(),
		lastModified: getLastModifiedFromHeader(response),
	};
}

function getFilenameFromContentDispositionHeader(response: Response): string {
	const contentDispositionHeader = response.headers.get("content-disposition");
	if (!contentDispositionHeader) {
		return "";
	}
	const filename = contentDispositionHeader.split("filename=")[1];
	return filename;
}

function getLastModifiedFromHeader(response: Response): Date {
	const lastModifiedHeader = response.headers.get("last-modified");
	if (!lastModifiedHeader) {
		return new Date();
	}
	return new Date(lastModifiedHeader);
}
