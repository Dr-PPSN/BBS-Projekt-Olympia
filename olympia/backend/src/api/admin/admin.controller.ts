import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { AdminService } from "./admin.service";
import { Api } from "./admin.constant";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller(Api.TITLE)
export class AdminController {
	constructor(private adminService: AdminService) {}

	@HttpCode(200)
	@Get(Api.GET_USERS)
	async getUsers(@Request() request): Promise<Array<Nutzer>> {
		return await this.adminService.getUsers(request.user.istAdmin);
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
