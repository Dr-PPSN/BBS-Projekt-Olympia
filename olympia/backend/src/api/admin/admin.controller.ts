import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { AdminService } from "./admin.service";
import { Api } from "./admin.constant";

@Controller(Api.TITLE)
export class AdminController {
	constructor(private adminService: AdminService) {}

	@Get(Api.GET_USERS)
	async getUsers(): Promise<Array<Nutzer>> {
		return await this.adminService.getUsers();
	}

	@HttpCode(200)
	@Post(Api.ADD_USER)
	async addUser(@Body() body): Promise<Nutzer> {
		return await this.adminService.addUser(body);
	}

	@HttpCode(200)
	@Post(Api.EDIT_USER)
	async editUser(@Body() body): Promise<Nutzer> {
		return await this.adminService.editUser(body);
	}

	@HttpCode(200)
	@Post(Api.DELETE_USER)
	async deleteUser(@Body() body): Promise<Nutzer> {
		return await this.adminService.deleteUser(body);
	}
}
