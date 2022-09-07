import {Controller, Post, UseGuards} from "@nestjs/common";
import {SessionService} from "@app/session/session.service";
import {AdminGuard} from "@app/user/guards/admin.guard";

@Controller()
export class SessionController {
    constructor(
        private readonly sessionsService: SessionService,
    ) {}


}