import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Public } from '../../utils/custom_decorators';
import { CreateEbookCommentDto } from './dto/create-comment.dto';
import { EbookCommentsService } from './comments.service';
import { UpdateEbookCommentDto } from './dto/update-comment.dto';

@Controller('ebook-comments')
export class EbookCommentsController {
  constructor(private readonly ebookCommentsService: EbookCommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateEbookCommentDto) {
    return await this.ebookCommentsService.create(createCommentDto);
  }

  @Public()
  @Get('all/ebook/:id')
  async findAllByEbookId(@Param('id') ebookId: string) {
    return await this.ebookCommentsService.findAllByEbookId(ebookId);
  }

  @Get('all/user/:id')
  async findAllByUserId(@Param('id') userId: string) {
    return await this.ebookCommentsService.findAllByUserId(userId);
  }

  @Get('one')
  async findOneByEbookIdAndUserId(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
  ) {
    return await this.ebookCommentsService.findOneByEbookIdAndUserId(
      ebookId,
      userId,
    );
  }

  @Patch(':id')
  async update(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
    @Body() updateCommentDto: UpdateEbookCommentDto,
  ) {
    return await this.ebookCommentsService.update(
      ebookId,
      userId,
      updateCommentDto,
    );
  }

  @Delete(':id')
  async remove(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
  ) {
    return await this.ebookCommentsService.remove(ebookId, userId);
  }
}
