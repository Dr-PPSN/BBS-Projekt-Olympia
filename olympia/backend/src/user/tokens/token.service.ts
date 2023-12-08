import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { ChangePasswordToken } from "../entity/change_password_token.entity";
import { Nutzer } from "../entity/nutzer.entity";
import { TOKEN_EXPIRED_OR_INVALID } from "./token.constant";

@Injectable()
export class TokenService {
	private maxTokenAgeInSeconds: number = null;

	constructor(
		@InjectRepository(ChangePasswordToken)
		private readonly changePasswordTokenRepository: Repository<ChangePasswordToken>,
	) {
		this.setMaxTokenAgeInSeconds();
	}

	async createChangePasswordToken(user: Nutzer): Promise<string> {
		await this.removeTokensForUser(user);
		const changePasswordToken = await this.changePasswordTokenRepository.save({
			nutzer: user,
		});
		return changePasswordToken.uuid;
	}

	async getUserByToken(token: string): Promise<Nutzer> {
		const expirationDate = new Date();
		expirationDate.setMinutes(
			expirationDate.getSeconds() - this.maxTokenAgeInSeconds,
		);

		const changePasswordToken =
			await this.changePasswordTokenRepository.findOne({
				where: { uuid: token, createdAt: MoreThan(expirationDate) },
				relations: ["nutzer"],
			});

		if (!changePasswordToken) {
			throw new BadRequestException(TOKEN_EXPIRED_OR_INVALID);
		}
		return changePasswordToken.nutzer;
	}

	async removeToken(token: string): Promise<void> {
		await this.changePasswordTokenRepository.delete({ uuid: token });
	}

	async removeTokensForUser(user: Nutzer): Promise<void> {
		await this.changePasswordTokenRepository.delete({ nutzer: user });
	}

	async removeExpiredTokens() {
		const expirationDate = new Date();
		expirationDate.setMinutes(
			expirationDate.getSeconds() - this.maxTokenAgeInSeconds,
		);
		const expiredTokens = await this.changePasswordTokenRepository
			.createQueryBuilder("token")
			.where("token.createdAt < :deleteDate", { deleteDate: expirationDate })
			.getMany();

		await this.changePasswordTokenRepository.remove(expiredTokens);
	}

	private setMaxTokenAgeInSeconds() {
		this.maxTokenAgeInSeconds = parseInt(
			process.env.CHANGE_PASSWORD_TOKEN_EXPIRES_IN,
			10,
		);
	}
}
