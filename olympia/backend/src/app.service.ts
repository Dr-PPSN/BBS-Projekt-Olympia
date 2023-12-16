import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { UserService } from "./user/user.service";

@Injectable()
export class AppService implements OnApplicationBootstrap {
	constructor(private userService: UserService) {}

	async onApplicationBootstrap(): Promise<void> {
		await this.userService.checkAdminExists();
	}
}
