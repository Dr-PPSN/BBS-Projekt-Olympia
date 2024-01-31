export const ALLOWED_IMAGE_TYPES = [
	"image/bmp",
	"image/gif",
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export function ensureIsImageType(blob: Blob) {
	if (ALLOWED_IMAGE_TYPES.includes(blob.type)) {
		return;
	}
	throw new Error("Image type not supported");
}
