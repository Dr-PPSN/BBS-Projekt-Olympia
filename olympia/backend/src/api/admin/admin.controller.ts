import { Controller, UseGuards } from "@nestjs/common";
import { Api } from "./admin.constant";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller(Api.TITLE)
export class AdminController {}
