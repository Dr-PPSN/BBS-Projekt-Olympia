import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	HttpStatus,
	HttpException,
} from "@nestjs/common";
import { DEFAULT_ERROR_MESSAGE } from "./server-error.constant";

@Catch(HttpException)
export class ServerErrorExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const status = exception.getStatus();

		if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
			response.status(status).json({
				statusCode: status,
				message: DEFAULT_ERROR_MESSAGE,
			});
		} else {
			response.status(status).json({
				statusCode: status,
				message: exception.message,
			});
		}
	}
}
