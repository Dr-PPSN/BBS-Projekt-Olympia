import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
	constructor(private adminService: AdminService) {}

	@Post("adduser")
	async addUser(@Body() body): Promise<any> {
		return await this.adminService.addUser(body);
	}
}
