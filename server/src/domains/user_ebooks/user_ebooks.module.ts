import { Module } from '@nestjs/common';
import { UserEbooksService } from './user_ebooks.service';
import { UserEbooksController } from './user_ebooks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEbook } from './entities/user_ebook.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEbook])],
  controllers: [UserEbooksController],
  providers: [UserEbooksService],
  exports: [UserEbooksService],
})
export class UserEbooksModule {}
