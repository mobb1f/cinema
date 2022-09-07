import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SessionEntity} from "@app/session/session.entity";

@Entity({name: 'hall'})
export class HallEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    countPlace: number;

    @Column()
    description: string;

    @Column({default: ''})
    image: string;

    @Column()
    countRow: number;

    @Column()
    countPlaceInRow: number;

    @OneToMany(() => SessionEntity, (session) => session.hall)
    sessions: SessionEntity[];
}