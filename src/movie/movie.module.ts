import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MovieEntity } from "@app/movie/movie.entity";
import { MovieController } from "@app/movie/movie.controller";
import { MovieService } from "@app/movie/movie.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    MulterModule.register({
      dest: './uploads'
    }),
  ],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule {}