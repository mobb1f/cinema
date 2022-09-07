import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MovieEntity} from "@app/movie/movie.entity";
import {HallEntity} from "@app/hall /hall.entity";

@Entity({name: 'session'})
export class SessionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'datetime'})
    datetime: Date;

    @Column()
    price: number;

    @ManyToOne(() => MovieEntity, (movie) => movie.sessions, {eager: true})
    movie: MovieEntity;

    @ManyToOne(() => HallEntity, (hall) => hall.sessions, {eager: true})
    hall: HallEntity;
}