import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CreateMovieDto } from "@app/movie/dto/createMovie.dto";
import { MovieService } from "@app/movie/movie.service";
import { MovieResponseInterface } from "@app/movie/types/movieResponse.interface";
import { DeleteResult } from "typeorm";
import { MoviesResponseInterface } from "@app/movie/types/moviesResponse.interface";
import { QueryMovieDto } from "@app/movie/dto/queryMovie.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import {editFileName, imageFileFilter} from "@app/movie/utils/file-upload.util";


@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
  ) {}

   @Get()
   async findAll(@Query() query: QueryMovieDto): Promise<MoviesResponseInterface>
   {
     return await this.movieService.findAll(query);
   }

   @Get(':slug')
   async findOne(@Param('slug') slug: string): Promise<MovieResponseInterface>
   {
     const movie = await this.movieService.findBySlug(slug);
     return this.movieService.buildMovieResponse(movie);
   }

   @Post()
   @UsePipes(new ValidationPipe())
   async createMovie(@Body('movie') createMovieDto: CreateMovieDto): Promise<MovieResponseInterface>
   {
     const movie = await this.movieService.createMovie(createMovieDto);
     return this.movieService.buildMovieResponse(movie);
   }

   @Post(':slug/upload/:field')
   @UseInterceptors(FileInterceptor('file', {
       storage: diskStorage({
         destination: './uploads',
         filename: editFileName,
       }),
       fileFilter: imageFileFilter,
     }),
   )
   async uploadIcon(@UploadedFile() file: Express.Multer.File, @Param('slug') slug: string, @Param('field') field: string): Promise<MovieResponseInterface>
   {
     const movie = await this.movieService.uploadFile(slug, file.filename, field);
     return this.movieService.buildMovieResponse(movie);
   }


   @Delete(':slug')
   async deleteMovie(@Param('slug') slug: string): Promise<DeleteResult>
   {
     return await this.movieService.deleteMovie(slug);
   }

   @Put(':slug')
   async updateMovie(@Param('slug') slug: string, @Body('movie') updateMovieDto: CreateMovieDto): Promise<MovieResponseInterface>{
    const movie = await this.movieService.updateMovie(slug, updateMovieDto);
    return this.movieService.buildMovieResponse(movie);
   }


}