import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import { UserEbooksService } from './user_ebooks.service';
import { CreateUserEbookDto } from './dto/create-user_ebook.dto';
import { UpdateUserEbookDto } from './dto/update-user_ebook.dto';

@Controller('user-ebooks')
export class UserEbooksController {
  constructor(private readonly userEbooksService: UserEbooksService) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createUserEbookDto: CreateUserEbookDto,
  ) {
    return await this.userEbooksService.create(
      req.user.id || req.user.uid,
      createUserEbookDto,
    );
  }

  @Get('history/user')
  async findAllByUserId(@Request() req: any) {
    return await this.userEbooksService.findAllByUserId(
      req.user.id || req.user.uid,
    );
  }

  @Get('one')
  async findOne(@Request() req: any, @Query('ebookId') ebookId: string) {
    return await this.userEbooksService.findOneByEbookIdAndUserId(
      ebookId,
      req.user.id || req.user.uid,
    );
  }

  @Patch('read')
  async read(
    @Request() req: any,
    @Query('ebookId') ebookId: string,
    @Body() updateUserEbookDto: UpdateUserEbookDto,
  ) {
    return await this.userEbooksService.read(
      ebookId,
      req.user.id || req.user.uid,
      updateUserEbookDto,
    );
  }

  @Patch('finish-read')
  async finishRead(
    @Request() req: any,
    @Query('ebookId') ebookId: string,
    @Body() updateUserEbookDto: UpdateUserEbookDto,
  ) {
    return await this.userEbooksService.finishReading(
      ebookId,
      req.user.id || req.user.uid,
      updateUserEbookDto,
    );
  }

  @Delete()
  async remove(@Request() req: any, @Query('ebookId') ebookId: string) {
    return await this.userEbooksService.remove(
      ebookId,
      req.user.id || req.user.uid,
    );
  }

  // @Put('restore')
  // async restore(
  //   @Query('userId') userId: string,
  //   @Query('ebookId') ebookId: string,
  // ) {
  //   return await this.userEbooksService.restore(ebookId, userId);
  // }
}
