import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { Nutzer } from "./entity/nutzer.entity";
import { TokenService } from "./tokens/token.service";
import { MailService } from "../mail/mail.service";
import { DefaultAdminUser } from "./user.constants";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Nutzer) private nutzerRepo: Repository<Nutzer>,
		private tokenService: TokenService,
		private mailService: MailService,
	) {}

	async getAllUsers(): Promise<Array<Nutzer>> {
		return await this.nutzerRepo.find({
			select: ["uuid", "vorname", "nachname", "email", "istAdmin", "sportart"],
		});
	}

	async changePassword(token: string, newPassword: string): Promise<Nutzer> {
		let user = await this.tokenService.getUserByToken(token);
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		user = await this.nutzerRepo.save({
			...user,
			passwort: hashedPassword,
			salt,
		});
		this.tokenService.removeTokensForUser(user);
		return user;
	}

	async inviteUser(user: Nutzer): Promise<Nutzer> {
		await this.nutzerRepo.save({
			...user,
			passwort: null,
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

	async findUserWithEmail(email: string): Promise<Nutzer> {
		return await this.nutzerRepo.findOne({
			where: { email },
		});
	}

	async deleteUser(user: Nutzer): Promise<Nutzer> {
		return await this.nutzerRepo.remove(user);
	}

	async editUser(user: Nutzer): Promise<Nutzer> {
		return await this.nutzerRepo.save(user);
	}

	async checkAdminExists(): Promise<void> {
		if (await this.adminExists()) {
			return;
		}
		this.addUserWithPassword({
			email: process.env.DEFAULT_ADMIN_EMAIL,
			passwort: process.env.DEFAULT_ADMIN_PASSWORD,
			vorname: DefaultAdminUser.FIRST_NAME,
			nachname: DefaultAdminUser.LAST_NAME,
			istAdmin: DefaultAdminUser.IS_ADMIN,
		});
	}

	async adminExists(): Promise<boolean> {
		return (await this.nutzerRepo.count({ where: { istAdmin: true } })) > 0;
	}

	// biome-ignore lint: muss any sein
	async addUserWithPassword(user: any): Promise<Nutzer> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.passwort, salt);
		return await this.nutzerRepo.save({
			...user,
			passwort: hashedPassword,
			salt,
		});
	}
}
