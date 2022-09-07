import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {SessionEntity} from "@app/session/session.entity";

@Entity({name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  duration: number;

  @Column({type: 'date'})
  startDate: Date;

  @Column('simple-array')
  genre: string[];

  @Column({default: ''})
  description: string;

  @Column({default: ''})
  icon: string;

  @Column({default: ''})
  fullHdImage: string;

  @Column({default: ''})
  trailer: string;

  @OneToMany(() => SessionEntity, (session) => session.movie)
  sessions: SessionEntity[];

}