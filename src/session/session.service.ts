import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SessionEntity} from "@app/session/session.entity";
import {Repository} from "typeorm";
import {MovieEntity} from "@app/movie/movie.entity";
import {HallEntity} from "@app/hall /hall.entity";

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly sessionRepository: Repository<SessionEntity>,

        @InjectRepository(MovieEntity)
        private readonly movieRepository: Repository<MovieEntity>,

        @InjectRepository(HallEntity)
        private readonly hallRepository: Repository<HallEntity>
    ) {}
}