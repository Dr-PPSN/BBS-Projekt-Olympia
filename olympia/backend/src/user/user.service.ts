import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { Nutzer } from "./entity/nutzer.entity";
import { TokenService } from "./tokens/token.service";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Nutzer) private nutzerRepo: Repository<Nutzer>,
		private tokenService: TokenService,
	) {}

	async findAllNutzer(): Promise<Array<Nutzer>> {
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

	async addUser(user: Nutzer): Promise<Nutzer> {
		return await this.nutzerRepo.save({
			...user,
			passwort: null,
			salt: null,
		});
	}

	async sendInvitation(user: Nutzer): Promise<void> {
		const token = await this.tokenService.createChangePasswordToken(user);
	}

	// TODO: später entfernen
	async addUserDebug(user: Nutzer): Promise<Nutzer> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.passwort, salt);
		return await this.nutzerRepo.save({
			...user,
			passwort: hashedPassword,
			salt,
		});
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
}
