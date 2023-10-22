import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { Nutzer } from "./entity/nutzer.entity";

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Nutzer) private nutzerRepo: Repository<Nutzer>,
	) {}

	async add(user: Nutzer): Promise<Nutzer> {
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
}
