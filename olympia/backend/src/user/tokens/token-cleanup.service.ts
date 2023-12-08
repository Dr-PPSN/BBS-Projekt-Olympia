import { Injectable } from "@nestjs/common";
import { TokenService } from "./token.service";

@Injectable()
export class TokenCleanupService {
	constructor(private readonly tokenService: TokenService) {}

	startTokenCleanup() {
		const cleanUpInterval_24h = 24 * 60 * 60 * 1000;
		setInterval(() => {
			this.tokenService.removeExpiredTokens();
		}, cleanUpInterval_24h);
	}
}
