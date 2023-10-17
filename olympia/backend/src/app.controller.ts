import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@UseGuards(JwtAuthGuard)
	@Get("test-user")
	getTestUser(@Request() request) {
		return request.user;
	}
}
