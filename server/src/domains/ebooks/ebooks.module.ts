import { Module } from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ebook } from './entities/ebook.entity';
import { SearchModule } from '../search/search.module';
import { UserEbooksModule } from '../user_ebooks/user_ebooks.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ebook]),
    SearchModule,
    UserEbooksModule,
    CategoriesModule,
  ],
  controllers: [EbooksController],
  providers: [EbooksService],
})
export class EbooksModule {}
