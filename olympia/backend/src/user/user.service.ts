import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { MailService } from "../mail/mail.service";
import { User } from "./entity/user.entity";
import { TokenService } from "./tokens/token.service";
import { DefaultAdminUser } from "./user.constants";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private tokenService: TokenService,
		private mailService: MailService,
	) {}

	async getAllUsers(): Promise<Array<User>> {
		return await this.userRepository.find({
			select: [
				"uuid",
				"firstName",
				"lastName",
				"email",
				"isAdmin",
				"discipline",
			],
		});
	}

	async changePassword(token: string, newPassword: string): Promise<User> {
		let user = await this.tokenService.getUserByToken(token);
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		user = await this.userRepository.save({
			...user,
			password: hashedPassword,
			salt,
		});
		this.tokenService.removeTokensForUser(user);
		return user;
	}

	async inviteUser(user: User): Promise<User> {
		await this.userRepository.save({
			...user,
			password: null,
			salt: null,
		});
		const token = await this.tokenService.createChangePasswordToken(user);
		this.mailService.sendInvitation(user, token);
		return user;
	}

	async sendChangePasswordMail(email: string): Promise<void> {
		const user = await this.findUserWithEmail(email);
		if (!user) {
			return;
		}
		const token = await this.tokenService.createChangePasswordToken(user);
		this.mailService.sendChangePassword(user, token);
	}

	async findUserWithEmail(email: string): Promise<User> {
		if (!email) {
			throw new Error("No email provided");
		}
		return await this.userRepository.findOne({
			where: { email },
		});
	}

	async deleteUser(user: User): Promise<User> {
		return await this.userRepository.remove(user);
	}

	async editUser(user: User): Promise<User> {
		return await this.userRepository.save(user);
	}

	async checkAdminExists(): Promise<void> {
		if (await this.adminExists()) {
			return;
		}
		this.addUserWithPassword({
			email: process.env.DEFAULT_ADMIN_EMAIL,
			password: process.env.DEFAULT_ADMIN_PASSWORD,
			firstName: DefaultAdminUser.FIRST_NAME,
			lastName: DefaultAdminUser.LAST_NAME,
			isAdmin: DefaultAdminUser.IS_ADMIN,
		});
	}

	async adminExists(): Promise<boolean> {
		return (await this.userRepository.count({ where: { isAdmin: true } })) > 0;
	}

	// biome-ignore lint: muss any sein
	async addUserWithPassword(user: any): Promise<User> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.password, salt);
		return await this.userRepository.save({
			...user,
			password: hashedPassword,
			salt,
		});
	}
}
