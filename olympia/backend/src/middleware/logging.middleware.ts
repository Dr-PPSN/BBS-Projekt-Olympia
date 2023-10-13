import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

const LOGGING_KONTEXT = "HTTP";
const EVENT = "finish";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
	private readonly logger = new Logger(LOGGING_KONTEXT);

	use(request: Request, response: Response, next: NextFunction) {
		const { method, originalUrl } = request;
		const start = Date.now();

		response.on(EVENT, () => {
			const dauer = Date.now() - start;
			const statusCode = response.statusCode;
			const logEintrag = {
				time: start,
				route: originalUrl,
				method: method,
				statusCode: statusCode,
				duration: `${dauer}ms`,
			};
			this.logger.log(JSON.stringify(logEintrag));
		});

		next();
	}
}
