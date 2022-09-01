import { IsNotEmpty } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly duration: number;

  @IsNotEmpty()
  readonly startDate: Date;

  @IsNotEmpty()
  readonly genre?: string[];

  readonly description: string;


  readonly icon: string;

  readonly fullHdImage: string;

  readonly trailer: string;
}