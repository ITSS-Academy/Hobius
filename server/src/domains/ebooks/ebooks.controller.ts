import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { Public } from '../../utils/custom_decorators';

@Controller('ebooks')
export class EbooksController {
  constructor(private readonly ebooksService: EbooksService) {}

  @Post()
  async create(@Body() createEbookDto: CreateEbookDto, @Request() req: any) {
    if (req.user.role) {
      return await this.ebooksService.create(createEbookDto);
    } else {
      throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    }
  }

  @Get()
  async findAll() {
    return await this.ebooksService.findAll();
  }

  @Public()
  @Get('trend')
  async listByTrend(@Query('limit') limit: string) {
    return await this.ebooksService.listByTrend(+limit);
  }

  @Public()
  @Get('recommend')
  async listByRecommend(@Query('limit') limit: string) {
    return await this.ebooksService.listByRandom(+limit);
  }

  @Public()
  @Get('rating')
  async listByRating(@Query('limit') limit: string) {
    return await this.ebooksService.listByRating(+limit);
  }

  @Public()
  @Get('one/:id')
  async findOne(@Param('id') id: string) {
    return await this.ebooksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEbookDto: UpdateEbookDto,
    @Request() req: any,
  ) {
    if (req.user.role) {
      return await this.ebooksService.update(id, updateEbookDto);
    } else {
      throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    if (req.user.role) {
      return await this.ebooksService.remove(id);
    } else {
      throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    }
  }

  @Patch('like/:id')
  async like(@Param('id') id: string, @Request() req: any) {
    return await this.ebooksService.like(id, req.user.id || req.user.uid);
  }

  @Patch('unlike/:id')
  async unlike(@Param('id') id: string, @Request() req: any) {
    return await this.ebooksService.unlike(id, req.user.id || req.user.uid);
  }

  @Public()
  @Patch('view/:id')
  async view(@Param('id') id: string) {
    return await this.ebooksService.view(id);
  }
}
