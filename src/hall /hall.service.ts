import { Injectable,} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {HallEntity} from "@app/hall /hall.entity";
import {getRepository, Repository} from "typeorm";
import {CreateHallDto} from "@app/hall /dto/createHall.dto";
import {HallResponseInterface} from "@app/hall /types/hallResponse.interface";
import {HallsResponseInterface} from "@app/hall /types/hallsResponse.interface";


@Injectable()
export class HallService {
    constructor(
        @InjectRepository(HallEntity)
        private readonly hallRepository: Repository<HallEntity>
    ) {}

    async findAll(): Promise<HallsResponseInterface>{
        const halls = await this.hallRepository.find();
        const hallsCount = await getRepository(HallEntity).createQueryBuilder().getCount();
        return {
            halls: halls, hallsCount
        }
    }

    async findById(hallId: number): Promise<HallEntity> {
        return await this.hallRepository.findOne(hallId);
    }

    async updateHall(hallId: number ,updateHallDto: CreateHallDto): Promise<HallEntity> {
        const hall = await this.hallRepository.findOne(hallId);
        Object.assign(hall, updateHallDto);

        return await this.hallRepository.save(hall);
    }

    async createHall(createHallDto: CreateHallDto): Promise<HallEntity>{
        const hall = new HallEntity();
        Object.assign(hall, createHallDto);

        return await this.hallRepository.save(hall);
    }

    async uploadImage(imageName: string, hallId: number): Promise<HallEntity>
    {
        const hall = await this.hallRepository.findOne(hallId);
        hall.image = imageName;

        return this.hallRepository.save(hall);
    }

    buildHallResponse(hall: HallEntity): HallResponseInterface {
        return {
            hall: {
                ...hall
            }
        }
    }

}