import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { Ebook } from './entities/ebook.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchService } from '../search/search.service';

@Injectable()
export class EbooksService {
  constructor(
    @InjectRepository(Ebook) private ebooksRepository: Repository<Ebook>,
    private readonly searchService: SearchService,
  ) {}

  async create(createEbookDto: CreateEbookDto) {
    try {
      let ebook = this.ebooksRepository.create(createEbookDto);
      ebook.publishedDate = new Date().toISOString();
      await this.ebooksRepository.save(ebook);
      await this.searchService.indexEbook(ebook);
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      return await this.ebooksRepository.find({
        select: ['id', 'title', 'categories', 'image', 'author'],
        relations: {
          categories: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.ebooksRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.author', 'author')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'author.id', 'author.name', 'categories'])
        .where('ebook.id = :id', { id })
        .getOne();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateEbookDto: UpdateEbookDto) {
    try {
      const ebook = await this.ebooksRepository.findOneBy({ id });
      if (ebook) {
        await this.ebooksRepository.save({ ...ebook, ...updateEbookDto });
        await this.searchService.updateEbook(ebook);
      } else {
        throw new HttpException('Ebook not found', HttpStatus.NOT_FOUND);
      }
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      const deleteResult = await this.ebooksRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new HttpException('Ebook not found', HttpStatus.NOT_FOUND);
      }
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
