import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { Public } from '../../utils/custom_decorators';
import { CreateEbookCommentDto } from './dto/create-comment.dto';
import { EbookCommentsService } from './comments.service';
import { UpdateEbookCommentDto } from './dto/update-comment.dto';

@Controller('ebook-comments')
export class EbookCommentsController {
  constructor(private readonly ebookCommentsService: EbookCommentsService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateEbookCommentDto,
    @Request() req: any,
  ) {
    return await this.ebookCommentsService.create(
      req.user.id || req.user.uid,
      createCommentDto,
    );
  }

  @Public()
  @Get('all/ebook/:id')
  async findAllByEbookId(@Param('id') ebookId: string) {
    return await this.ebookCommentsService.findAllByEbookId(ebookId);
  }

  @Get('all/user')
  async findAllByUserId(@Request() req: any) {
    return await this.ebookCommentsService.findAllByUserId(
      req.user.id || req.user.uid,
    );
  }

  @Get('one')
  async findOneByEbookIdAndUserId(
    @Request() req: any,
    @Query('ebookId') ebookId: string,
  ) {
    return await this.ebookCommentsService.findOneByEbookIdAndUserId(
      ebookId,
      req.user.id || req.user.uid,
    );
  }

  @Patch()
  async update(
    @Request() req: any,
    @Query('ebookId') ebookId: string,
    @Body() updateCommentDto: UpdateEbookCommentDto,
  ) {
    return await this.ebookCommentsService.update(
      ebookId,
      req.user.id || req.user.uid,
      updateCommentDto,
    );
  }

  @Delete()
  async remove(@Request() req: any, @Query('ebookId') ebookId: string) {
    return await this.ebookCommentsService.remove(
      ebookId,
      req.user.id || req.user.uid,
    );
  }
}
