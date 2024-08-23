import { Module } from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ebook]), SearchModule],
  controllers: [EbooksController],
  providers: [EbooksService],
})
export class EbooksModule {}
