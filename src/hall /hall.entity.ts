import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
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
}