import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt';

@Entity({name: 'users'})
export class UserEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({select: false})
  password: string;

  @Column({default: false})
  admin: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

}