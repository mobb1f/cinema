import {Body, Controller, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {HallService} from "@app/hall /hall.service";
import {AdminGuard} from "@app/user/guards/admin.guard";
import {CreateHallDto} from "@app/hall /dto/createHall.dto";
import {HallResponseInterface} from "@app/hall /types/hallResponse.interface";
import {HallsResponseInterface} from "@app/hall /types/hallsResponse.interface";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {editFileName, imageFileFilter} from "@app/utils/file-upload.util";

@Controller('hall')
export class HallController{
    constructor(
        private readonly hallService: HallService
    ) {}

    @Get()
    async findAll(): Promise<HallsResponseInterface> {
        return await this.hallService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') hallId: number): Promise<HallResponseInterface> {
        const hall = await this.hallService.findById(hallId);
        return this.hallService.buildHallResponse(hall);
    }

    @Put(':id')
    @UseGuards(AdminGuard)
    async updateHall(@Param('id') hallId: number,
                     @Body('hall') updateHallDto: CreateHallDto): Promise<HallResponseInterface> {
        const hall = await this.hallService.updateHall(hallId, updateHallDto);
        return this.hallService.buildHallResponse(hall);
    }

    @Post(':id/upload')
    @UseGuards(AdminGuard)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async uploadImage(@UploadedFile() image: Express.Multer.File, @Param('id') hallId: number): Promise<HallResponseInterface>
    {
        const hall = await this.hallService.uploadImage(image.filename, hallId);
        return this.hallService.buildHallResponse(hall);
    }

    @Post()
    @UseGuards(AdminGuard)
    async createHall(@Body('hall') createHallDto: CreateHallDto): Promise<HallResponseInterface>{
        const hall = await this.hallService.createHall(createHallDto);
        return this.hallService.buildHallResponse(hall);
    }

}