import { Injectable } from "@nestjs/common";
import { Nutzer } from "src/user/entity/nutzer.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AdminService {
	constructor(private userService: UserService) {}

	async addUser(body): Promise<Nutzer> {
		return this.userService.add(body);
	}
}
