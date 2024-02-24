import { createReadStream } from "fs";
import { join } from "path";

export function readFile(filePath: string): Promise<string> {
	const file = createReadStream(join(process.cwd(), filePath));
	return streamToString(file);
}

function streamToString(stream): Promise<string> {
	const chunks = [];
	return new Promise((resolve, reject) => {
		stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
		stream.on("error", (err) => reject(err));
		stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
	});
}
