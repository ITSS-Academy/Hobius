import {
  Request,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  HttpException,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from '../../utils/custom_decorators';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get('ebooks')
  async searchEbooks(@Query('q') request: string) {
    let ebooks = await this.searchService.searchEbooks(request);
    return {
      ebooks: ebooks,
    };
  }

  @Public()
  @Get('any')
  async searchTags(@Query('q') q: string) {
    let ebooks = await this.searchService.searchAny('hobius_ebooks', q);
    return {
      ebooks: ebooks,
    };
  }

  @Delete('ebooks/:id')
  async deleteEbooks(@Param('id') id: string, @Request() req: any) {
    if (!req.user.role) {
      throw new HttpException('Permission denied', 403);
    }
    return this.searchService.deleteEbook(id);
  }
}
