import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
	constructor(private adminService: AdminService) {}

	@Get("users")
	async getUsers(): Promise<Array<Nutzer>> {
		return await this.adminService.getUsers();
	}

	@HttpCode(200)
	@Post("users/adduser")
	async addUser(@Body() body): Promise<Nutzer> {
		return await this.adminService.addUser(body);
	}

	@HttpCode(200)
	@Post("users/deleteuser")
	async deleteUser(@Body() body): Promise<Nutzer> {
		return await this.adminService.deleteUser(body);
	}
}
