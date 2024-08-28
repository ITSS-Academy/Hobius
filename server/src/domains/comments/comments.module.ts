import { Module } from '@nestjs/common';
import { EbookCommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EbookComment } from './entities/comment.entity';
import { EbookCommentsController } from './comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EbookComment])],
  controllers: [EbookCommentsController],
  providers: [EbookCommentsService],
})
export class EbookCommentsModule {}
