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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Public } from '../../utils/custom_decorators';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.create(createCommentDto);
  }

  @Public()
  @Get('all/ebook/:id')
  async findAllByEbookId(@Param('id') ebookId: string) {
    return await this.commentsService.findAllByEbookId(ebookId);
  }

  @Get('all/user/:id')
  async findAllByUserId(@Param('id') userId: string) {
    return await this.commentsService.findAllByUserId(userId);
  }

  @Get('one')
  async findOneByEbookIdAndUserId(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
  ) {
    return await this.commentsService.findOneByEbookIdAndUserId(
      ebookId,
      userId,
    );
  }

  @Patch(':id')
  async update(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentsService.update(ebookId, userId, updateCommentDto);
  }

  @Delete(':id')
  async remove(
    @Query('userId') userId: string,
    @Query('ebookId') ebookId: string,
  ) {
    return await this.commentsService.remove(ebookId, userId);
  }
}
