import {HallEntity} from "@app/hall /hall.entity";

export interface HallsResponseInterface {
    halls: HallEntity[],
    hallsCount: number,
}