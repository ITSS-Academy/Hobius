import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEbookDto } from './dto/create-ebook.dto';
import { UpdateEbookDto } from './dto/update-ebook.dto';
import { Ebook } from './entities/ebook.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchService } from '../search/search.service';
import { UserEbook } from '../user_ebooks/entities/user_ebook.entity';
import { UserEbooksService } from '../user_ebooks/user_ebooks.service';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class EbooksService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Ebook) private ebooksRepository: Repository<Ebook>,
    private userEbooksService: UserEbooksService,
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
        select: [
          'id',
          'title',
          'author',
          'detail',
          'image',
          'publishedDate',
          'view',
          'like',
          'categories',
          'pdf',
        ],
        relations: {
          categories: true,
        },
      });
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async listByTrend(limit: number) {
    try {
      return await this.ebooksRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .orderBy('ebook.view', 'DESC')
        .limit(limit)
        .getMany();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async listByRating(limit: number) {
    try {
      return await this.ebooksRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .orderBy('ebook.like', 'DESC')
        .limit(limit)
        .getMany();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async listByRandom(limit: number) {
    try {
      return await this.ebooksRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .orderBy('RANDOM()')
        .limit(limit)
        .getMany();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async like(id: string, userId: string) {
    try {
      const ebook = await this.ebooksRepository.findOneBy({ id });
      if (!ebook) {
        throw new HttpException('Ebook not found', HttpStatus.BAD_REQUEST);
      }
      ebook.like++;
      //check that user has already viewed this ebook
      const userEbook = await this.userEbooksService.findOneByEbookIdAndUserId(
        id,
        userId,
      );
      if (userEbook) {
        userEbook.isLiked = true;
        await this.userEbooksService.update(
          userEbook.ebook.id,
          userId,
          userEbook,
        );
      } else {
        //create new userEbook
        const userEbook = new UserEbook();
        userEbook.ebook = ebook;
        userEbook.user = { id: userId } as any;
        userEbook.isLiked = true;
        await this.userEbooksService.create(userEbook);
      }
      await this.ebooksRepository.save(ebook);
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async unlike(id: string, userId: string) {
    try {
      const ebook = await this.ebooksRepository.findOneBy({ id });
      if (!ebook) {
        throw new HttpException('Ebook not found', HttpStatus.BAD_REQUEST);
      }
      ebook.like--;
      //check that user has already viewed this ebook
      const userEbook = await this.userEbooksService.findOneByEbookIdAndUserId(
        id,
        userId,
      );
      if (userEbook) {
        userEbook.isLiked = false;
        await this.userEbooksService.update(
          userEbook.ebook.id,
          userId,
          userEbook,
        );
      } else {
        //create new userEbook
        const userEbook = new UserEbook();
        userEbook.ebook = ebook;
        userEbook.user = { id: userId } as any;
        userEbook.isLiked = false;
        await this.userEbooksService.create(userEbook);
      }
      await this.ebooksRepository.save(ebook);
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async view(id: string) {
    try {
      const ebook = await this.ebooksRepository.findOneBy({ id });
      if (!ebook) {
        throw new HttpException('Ebook not found', HttpStatus.BAD_REQUEST);
      }
      ebook.view++;
      await this.ebooksRepository.save(ebook);
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.ebooksRepository
        .createQueryBuilder('ebook')
        .leftJoinAndSelect('ebook.categories', 'categories')
        .select(['ebook', 'categories'])
        .where('ebook.id = :id', { id })
        .getOne();
      if (!result) {
        throw new HttpException('Ebook not found', HttpStatus.BAD_REQUEST);
      }
      return result;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateEbookDto: UpdateEbookDto) {
    const ebook = await this.ebooksRepository.findOneBy({ id });
    if (!ebook) {
      throw new HttpException('Ebook not found', HttpStatus.BAD_REQUEST);
    }
    try {
      // Fetch categories from the database
      const categories = await this.categoriesRepository.findBy({
        id: In(updateEbookDto.categories.map((category) => category.id)),
      });

      // Update ebook properties
      ebook.title = updateEbookDto.title;
      ebook.author = updateEbookDto.author;
      ebook.detail = updateEbookDto.detail;
      ebook.image = updateEbookDto.image;
      ebook.pdf = updateEbookDto.pdf;
      ebook.categories = categories;

      await this.ebooksRepository.save(ebook);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
    await this.searchService.updateEbook(ebook);
    return;
  }

  async remove(id: string) {
    try {
      const deleteResult = await this.ebooksRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new HttpException('Ebook not found', HttpStatus.BAD_REQUEST);
      }
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
