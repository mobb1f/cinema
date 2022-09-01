import { MovieEntity } from "@app/movie/movie.entity";

export interface MoviesResponseInterface {
  movies: MovieEntity[],
  moviesCount: number,
}