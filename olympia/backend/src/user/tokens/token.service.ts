import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MoreThan, Repository } from "typeorm";
import { ChangePasswordToken } from "../entity/change_password_token.entity";
import { User } from "../entity/user.entity";
import { TOKEN_EXPIRED_OR_INVALID } from "./token.constant";
import { getTokenExpirationDate } from "./token.utils";

@Injectable()
export class TokenService {
	private maxTokenAgeInSeconds = null;

	constructor(
		@InjectRepository(ChangePasswordToken)
		private readonly changePasswordTokenRepository: Repository<ChangePasswordToken>,
	) {
		this.setMaxTokenAgeInSeconds();
	}

	async createChangePasswordToken(user: User): Promise<string> {
		await this.removeTokensForUser(user);
		const changePasswordToken = await this.changePasswordTokenRepository.save({
			user,
		});
		return changePasswordToken.uuid;
	}

	async getUserByToken(token: string): Promise<User> {
		if (!token) {
			throw new BadRequestException(TOKEN_EXPIRED_OR_INVALID);
		}
		const expirationDate = getTokenExpirationDate(this.maxTokenAgeInSeconds);
		const changePasswordToken =
			await this.changePasswordTokenRepository.findOne({
				where: { uuid: token, createdAt: MoreThan(expirationDate) },
				relations: ["user"],
			});
		if (!changePasswordToken) {
			throw new BadRequestException(TOKEN_EXPIRED_OR_INVALID);
		}
		return changePasswordToken.user;
	}

	async removeToken(token: string): Promise<void> {
		await this.changePasswordTokenRepository.delete({ uuid: token });
	}

	async removeTokensForUser(user: User): Promise<void> {
		await this.changePasswordTokenRepository.delete({ user: user });
	}

	async removeExpiredTokens() {
		const expirationDate = getTokenExpirationDate(this.maxTokenAgeInSeconds);
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
