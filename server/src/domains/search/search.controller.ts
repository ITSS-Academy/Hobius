import { Body, Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { Public } from '../../utils/custom_decorators';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get('ebooks')
  async searchEbooks(@Body() request: any) {
    return this.searchService.searchEbooks(request.query);
  }

  @Public()
  @Get('any')
  async searchTags(@Query('q') q: string) {
    let ebooks = await this.searchService.searchAny('hobius_ebooks', q);
    return {
      ebooks: ebooks,
    };
  }
}
