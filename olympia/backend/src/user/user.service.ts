import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Einladung } from "./entity/einladung.entity";
import { Nutzer } from "./entity/nutzer.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Nutzer) private nutzerRepo: Repository<Nutzer>,
		@InjectRepository(Einladung) private einladungRepo: Repository<Einladung>,
	) {}

	async findAllNutzer(): Promise<Array<Nutzer>> {
		return await this.nutzerRepo.find();
	}

	async inviteNutzer(user: Nutzer): Promise<string> {
		const invite = this.einladungRepo.create({
			token: uuidv4(),
			nutzer: user,
		});
		await this.einladungRepo.save(invite);
		return invite.token;
	}

	async updatePassword(user: Nutzer): Promise<Nutzer> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.passwort, salt);
		return await this.nutzerRepo.save({
			...user,
			passwort: hashedPassword,
			salt,
		});
	}

	// TODO: später entfernen
	async addUser(user: Nutzer): Promise<Nutzer> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(user.passwort, salt);
		return await this.nutzerRepo.save({
			...user,
			passwort: hashedPassword,
			salt,
		});
	}

	async findNutzerWithEmail(email: string): Promise<Nutzer> {
		return await this.nutzerRepo.findOne({
			where: { email },
		});
	}

	async findInviteWithToken(token: string): Promise<Einladung> {
		return await this.einladungRepo.findOne({
			where: { token },
		});
	}

	async deleteUser(user: Nutzer): Promise<Nutzer> {
		return await this.nutzerRepo.remove(user);
	}
}
