import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UseGuards,
} from "@nestjs/common";
import { User } from "../../../user/entity/user.entity";
import { UserService } from "../../../user/user.service";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Api as AdminApi } from "../admin.constant";
import { Api } from "./user.constant";

@UseGuards(JwtAuthGuard)
@Controller(AdminApi.TITLE + Api.TITLE)
export class UserController {
	constructor(private userSerivce: UserService) {}

	@HttpCode(200)
	@Get()
	async getUsers(): Promise<Array<User>> {
		return await this.userSerivce.getAllUsers();
	}

	@HttpCode(200)
	@Post(Api.INVITE_USER)
	async inviteUser(@Body() user: User): Promise<User> {
		return await this.userSerivce.inviteUser(user);
	}

	@HttpCode(200)
	@Post(Api.ADD_USER_DEBUG)
	async addUserDebug(@Body() user: User): Promise<User> {
		return await this.userSerivce.addUserWithPassword(user);
	}

	@HttpCode(200)
	@Post(Api.EDIT_USER)
	async editUser(@Body() user: User): Promise<User> {
		return await this.userSerivce.editUser(user);
	}

	@HttpCode(200)
	@Post(Api.DELETE_USER)
	async deleteUser(@Body() user: User): Promise<User> {
		return await this.userSerivce.deleteUser(user);
	}
}
