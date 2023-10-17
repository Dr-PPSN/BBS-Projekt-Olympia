import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// Authguard mit der Strategie "local", die in local.strategy.ts definiert ist
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {

}
