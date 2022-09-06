import {IsNotEmpty} from "class-validator";

export class CreateHallDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly countPlace: number;

    @IsNotEmpty()
    readonly description: string;

    readonly image: string;

    @IsNotEmpty()
    readonly countRow: number;

    @IsNotEmpty()
    readonly countPlaceInRow: number;

}