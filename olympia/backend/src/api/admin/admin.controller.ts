import { Controller, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { Api } from "./admin.constant";

@UseGuards(JwtAuthGuard)
@Controller(Api.TITLE)
export class AdminController {}
