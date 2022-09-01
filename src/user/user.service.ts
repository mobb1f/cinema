import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@app/user/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "@app/user/dto/createUser.dto";
import { UserResponseInterface } from "@app/user/types/userResponse.interface";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@app/config";
import { compare } from "bcrypt";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity>
  {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userByEmail) {
      throw new HttpException('This email already used', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  async login(loginUserDto: CreateUserDto): Promise<UserEntity>
  {
    const user = await this.userRepository.findOne({
      email: loginUserDto.email
    }, {select: ["id", "email", "password", "admin"]})

    if (!user)
    {
      throw new HttpException('Email or password is invalid', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const isPasswordCorrect = await compare(loginUserDto.password, user.password);

    if (!isPasswordCorrect){
      throw new HttpException('Email or password is invalid', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    delete user.password;

    return user;
  }

  findById(userId: number): Promise<UserEntity>{
    return this.userRepository.findOne(userId);
  }

  generateJwt(user: UserEntity): string{
    return sign({
      id: user.id,
      email: user.email,
    }, JWT_SECRET)
  }

  buildUserResponse(user: UserEntity): UserResponseInterface{
    return {
      user: {
      ...user,
      token: this.generateJwt(user),
     }
    }
  }


}