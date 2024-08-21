import { Injectable } from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';

@Injectable()
export class EbooksService {
  create(createEbookDto: CreateEbookDto) {
    return 'This action adds a new ebook';
  }

  findAll() {
    return `This action returns all ebooks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ebook`;
  }

  update(id: number, updateEbookDto: UpdateEbookDto) {
    return `This action updates a #${id} ebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} ebook`;
  }
}
