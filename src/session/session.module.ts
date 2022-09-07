import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {SessionEntity} from "@app/session/session.entity";
import {MovieEntity} from "@app/movie/movie.entity";
import {HallEntity} from "@app/hall /hall.entity";
import {SessionController} from "@app/session/session.controller";
import {SessionService} from "@app/session/session.service";

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity, MovieEntity, HallEntity])],
    controllers: [SessionController],
    providers: [SessionService]
})
export class SessionModule {}