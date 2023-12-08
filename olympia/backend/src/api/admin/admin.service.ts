import { Injectable } from "@nestjs/common";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { UserService } from "../../user/user.service";

@Injectable()
export class AdminService {
	constructor(private userService: UserService) {}

	async getUsers(): Promise<Array<Nutzer>> {
		return await this.userService.findAllNutzer();
	}

	async addUser(body): Promise<Nutzer> {
		const user = await this.userService.addUser(body);
		this.userService.sendInvitation(user);
		return user;
	}

	async addUserDebug(user: Nutzer): Promise<Nutzer> {
		return await this.userService.addUserDebug(user);
	}

	async editUser(body): Promise<Nutzer> {
		return await this.userService.editUser(body);
	}

	async deleteUser(body): Promise<Nutzer> {
		return await this.userService.deleteUser(body);
	}
}
