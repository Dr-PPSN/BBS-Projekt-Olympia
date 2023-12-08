import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UseGuards,
} from "@nestjs/common";
import { Nutzer } from "../../../user/entity/nutzer.entity";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Api as AdminApi } from "../admin.constant";
import { AdminService } from "../admin.service";
import { Api } from "./nutzer.constant";

@UseGuards(JwtAuthGuard)
@Controller(AdminApi.TITLE + Api.TITLE)
export class NutzerController {
	constructor(private adminService: AdminService) {}

	@HttpCode(200)
	@Get()
	async getUsers(): Promise<Array<Nutzer>> {
		return await this.adminService.getUsers();
	}

	@HttpCode(200)
	@Post(Api.ADD_USER)
	async addUser(@Body() body): Promise<Nutzer> {
		return await this.adminService.addUser(body);
	}

	@HttpCode(200)
	@Post(Api.ADD_USER_DEBUG)
	async addUserDebug(@Body() body): Promise<Nutzer> {
		return await this.adminService.addUserDebug(body);
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
