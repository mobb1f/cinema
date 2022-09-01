import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  icon: string;

  @Column({default: ''})
  fullHdImage: string;

  @Column({default: ''})
  trailer: string;

}