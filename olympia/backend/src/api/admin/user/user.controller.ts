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
import { Api } from "./user.constant";
import { UserService } from "../../../user/user.service";

@UseGuards(JwtAuthGuard)
@Controller(AdminApi.TITLE + Api.TITLE)
export class UserController {
	constructor(private userSerivce: UserService) {}

	@HttpCode(200)
	@Get()
	async getUsers(): Promise<Array<Nutzer>> {
		return await this.userSerivce.getAllUsers();
	}

	@HttpCode(200)
	@Post(Api.INVITE_USER)
	async inviteUser(@Body() body): Promise<Nutzer> {
		return await this.userSerivce.inviteUser(body);
	}

	@HttpCode(200)
	@Post(Api.ADD_USER_DEBUG)
	async addUserDebug(@Body() body): Promise<Nutzer> {
		return await this.userSerivce.addUserWithPassword(body);
	}

	@HttpCode(200)
	@Post(Api.EDIT_USER)
	async editUser(@Body() body): Promise<Nutzer> {
		return await this.userSerivce.editUser(body);
	}

	@HttpCode(200)
	@Post(Api.DELETE_USER)
	async deleteUser(@Body() body): Promise<Nutzer> {
		return await this.userSerivce.deleteUser(body);
	}
}
