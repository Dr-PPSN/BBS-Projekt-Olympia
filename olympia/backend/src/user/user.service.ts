import { Injectable } from "@nestjs/common";
import { USERS } from "./user.constant";
import { User } from "./user.model";

@Injectable()
export class UserService {
	async findeUserMitEmail(email: string): Promise<User | undefined> {
		return USERS.find((user) => user.email === email);
	}
}
