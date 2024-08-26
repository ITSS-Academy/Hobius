import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Put} from '@nestjs/common';
import {UserEbooksService} from './user_ebooks.service';
import {CreateUserEbookDto} from './dto/create-user_ebook.dto';
import {UpdateUserEbookDto} from './dto/update-user_ebook.dto';

@Controller('user-ebooks')
export class UserEbooksController {
    constructor(private readonly userEbooksService: UserEbooksService) {
    }

    @Post()
    async create(@Body() createUserEbookDto: CreateUserEbookDto) {
        return await this.userEbooksService.create(createUserEbookDto);
    }

    @Get('user/:id')
    async findAllByUserId(@Param('id') id: string) {
        return await this.userEbooksService.findAllByUserId(id);
    }

    @Get('one')
    async findOne(@Query('userId') userId: string, @Query('ebookId') ebookId: string) {
        return await this.userEbooksService.findOneByEbookIdAndUserId(ebookId, userId);
    }

    @Patch('read')
    async read(@Query('userId') userId: string, @Query('ebookId') ebookId: string, @Body() updateUserEbookDto: UpdateUserEbookDto) {
        return await this.userEbooksService.read(ebookId, userId, updateUserEbookDto);
    }

    @Patch('finish-read')
    async finishRead(@Query('userId') userId: string, @Query('ebookId') ebookId: string, @Body() updateUserEbookDto: UpdateUserEbookDto) {
        return await this.userEbooksService.finishReading(ebookId, userId, updateUserEbookDto);
    }

    @Delete()
    async remove(@Query('userId') userId: string, @Query('ebookId') ebookId: string) {
        return await this.userEbooksService.remove(ebookId, userId);
    }

    @Put('restore')
    async restore(@Query('userId') userId: string, @Query('ebookId') ebookId: string) {
        return await this.userEbooksService.restore(ebookId, userId);
    }
}
