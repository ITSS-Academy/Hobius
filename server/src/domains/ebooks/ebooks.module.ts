import { Module } from '@nestjs/common';
import { EbooksService } from './ebooks.service';
import { EbooksController } from './ebooks.controller';

@Module({
  controllers: [EbooksController],
  providers: [EbooksService],
})
export class EbooksModule {}
