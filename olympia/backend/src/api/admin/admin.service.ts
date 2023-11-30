import { Injectable } from "@nestjs/common";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { UserService } from "../../user/user.service";

@Injectable()
export class AdminService {
	constructor(private userService: UserService) {}

	async getUsers(): Promise<Array<Nutzer>> {
		return await this.userService.findAllNutzer();
	}

	async inviteUser(body): Promise<string> {
		const user = await this.userService.findNutzerWithEmail(body.email);
		return await this.userService.inviteNutzer(user);
	}

	async addUser(body): Promise<Nutzer> {
		return await this.userService.addUser(body);
	}

	async editUser(body): Promise<Nutzer> {
		return await this.userService.editUser(body);
	}

	async deleteUser(body): Promise<Nutzer> {
		return await this.userService.deleteUser(body);
	}
}
