import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {HallEntity} from "@app/hall /hall.entity";
import {HallController} from "@app/hall /hall.controller";
import {HallService} from "@app/hall /hall.service";
import {MulterModule} from "@nestjs/platform-express";

@Module({
    imports: [
        TypeOrmModule.forFeature([HallEntity]),
        MulterModule.register({
            dest: './uploads'
        })
    ],
    controllers: [HallController],
    providers: [HallService],
})
export class HallModule{}