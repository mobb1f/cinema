import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateMovieDto } from "@app/movie/dto/createMovie.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { MovieEntity } from "@app/movie/movie.entity";
import { DeleteResult, getRepository, Repository } from "typeorm";
import slugify from "slugify";
import { MovieResponseInterface } from "@app/movie/types/movieResponse.interface";
import { MoviesResponseInterface } from "@app/movie/types/moviesResponse.interface";
import { QueryMovieDto } from "@app/movie/dto/queryMovie.dto";

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) {}

  async findAll(query: QueryMovieDto): Promise<MoviesResponseInterface> {
    const queryBuilder = getRepository(MovieEntity)
      .createQueryBuilder('movies');

    queryBuilder.orderBy('movies.name', 'DESC');


    const moviesCount = await queryBuilder.getCount();

    if(query.name) {
      queryBuilder.andWhere('movies.name LIKE :name', {
        name: `%${query.name}%`
      });
    }

    if (query.genre) {
      queryBuilder.andWhere('movies.genre LIKE :genre', {
        genre: `%${query.genre}%`
      });
    }

    if (query.limit){
      queryBuilder.limit(query.limit);
    }

    if (query.offset)
    {
      queryBuilder.offset(query.offset);
    }

    const movies = await queryBuilder.getMany();
    return { movies: movies, moviesCount }


  }

  async createMovie(createMovieDto: CreateMovieDto): Promise<MovieEntity>
  {
    const movie = new MovieEntity();
    Object.assign(movie, createMovieDto);

    movie.slug = this.getSlug(movie.name);

    return await this.movieRepository.save(movie);
  }

  async deleteMovie(slug: string): Promise<DeleteResult>
  {
    const movie = await this.findBySlug(slug);

    return await this.movieRepository.delete({ slug });
  }

  async updateMovie(slug: string, updateMovieDto: CreateMovieDto): Promise<MovieEntity>
  {
    const movie = await this.findBySlug(slug);

    if (movie.name != updateMovieDto.name)
    {
      movie.slug = this.getSlug(updateMovieDto.name);
    }

    Object.assign(movie, updateMovieDto);

    return await this.movieRepository.save(movie);
  }

  async uploadFile(slug: string, fileName: string, field: string): Promise<MovieEntity>
  {
    if (!['icon', 'fullHdImage'].some(str => str === field)){
      throw new HttpException('Unknown field', HttpStatus.BAD_REQUEST);
    }

    const movie = await this.findBySlug(slug);
    movie[field] = fileName;
    return await this.movieRepository.save(movie);
  }

  async findBySlug(slug: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({ slug });
    if (!movie)
    {
      throw new HttpException('Movie doesnt exist', HttpStatus.NOT_FOUND)
    }
    return movie;
  }

  buildMovieResponse(movie: MovieEntity): MovieResponseInterface{
    return {
      movie: {
        ...movie
      }
    }
  }


  private getSlug(name: string): string {
    return slugify(name, {lower: true}) + '-' + (Math.random() * Math.pow(36,6) | 0).toString(36);
  }
}