import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserEbookDto } from './dto/create-user_ebook.dto';
import { UpdateUserEbookDto } from './dto/update-user_ebook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadingStatus, UserEbook } from './entities/user_ebook.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class UserEbooksService {
  constructor(
    @InjectRepository(UserEbook)
    private userEbooksRepository: Repository<UserEbook>,
  ) {}

  async validate(userEbook: UserEbook) {
    // Validate the DTO
    const validationErrors = await validate(userEbook);
    if (validationErrors.length > 0) {
      // Handle validation errors, e.g., throw an exception or return an error response
      throw new HttpException(
        {
          message:
            '[' +
            validationErrors
              .map((error) => Object.values(error.constraints).join(', '))
              .join(', ') +
            ']',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(createUserEbookDto: CreateUserEbookDto) {
    try {
      let userEbook = this.userEbooksRepository.create(createUserEbookDto);
      userEbook.purchaseDate = new Date().toISOString();
      userEbook.readingStatus = ReadingStatus.TO_READ;
      userEbook.currentPage = 0;
      userEbook.lastPageRead = 0;
      userEbook.lastReadDate = null;

      await this.userEbooksRepository.save(userEbook);
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByUserId(userId: string) {
    try {
      return await this.userEbooksRepository
        .createQueryBuilder('userEbook')
        .leftJoinAndSelect('userEbook.ebook', 'ebook')
        .select([
          'userEbook.readingStatus',
          'userEbook.purchaseDate',
          'userEbook.lastReadDate',
          'userEbook.lastPageRead',
          'userEbook.currentPage',
          'ebook.id',
          'ebook.title',
        ])
        .where('userEbook.userId = :userId', { userId })
        .getMany();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByEbookIdAndUserId(ebookId: string, userId: string) {
    try {
      return await this.userEbooksRepository
        .createQueryBuilder('userEbook')
        .leftJoinAndSelect('userEbook.ebook', 'ebook')
        .leftJoinAndSelect('userEbook.user', 'user')
        .select([
          'userEbook',
          'ebook.id',
          'ebook.title',
          'user.id',
          'user.userName',
          'user.avatarURL',
        ])
        .where('userEbook.userId = :userId', { userId })
        .andWhere('userEbook.ebookId = :ebookId', { ebookId })
        .getOne();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(ebookId: string, userId: string, userEbook: UpdateUserEbookDto) {
    try {
      await this.userEbooksRepository
        .createQueryBuilder()
        .update(UserEbook)
        .set(userEbook)
        .where('userId = :userId AND ebookId = :ebookId', { userId, ebookId })
        .execute();
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(ebookId: string, userId: string) {
    try {
      await this.userEbooksRepository
        .createQueryBuilder()
        .softDelete()
        .where('userId = :userId AND ebookId = :ebookId', { userId, ebookId })
        .execute();
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async restore(ebookId: string, userId: string) {
    try {
      await this.userEbooksRepository
        .createQueryBuilder()
        .restore()
        .where('userId = :userId AND ebookId = :ebookId', { userId, ebookId })
        .execute();
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async read(
    ebookId: string,
    userId: string,
    updateUserEbookDto: UpdateUserEbookDto,
  ) {
    try {
      // Step 1: Find the UserEbook
      let userEbook = await this.findOneByEbookIdAndUserId(ebookId, userId);

      // Step 2: Update the UserEbook
      userEbook.currentPage = updateUserEbookDto.currentPage;
      userEbook.lastPageRead = updateUserEbookDto.lastPageRead;
      userEbook.lastReadDate = new Date().toISOString();
      userEbook.readingStatus = ReadingStatus.READING;

      // Step 3: Validate the updated UserEbook
      await this.validate(userEbook);

      // Step 4: Save the updated UserEbook
      return await this.update(ebookId, userId, userEbook);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async finishReading(
    ebookId: string,
    userId: string,
    updateUserEbookDto: UpdateUserEbookDto,
  ) {
    try {
      // Step 1: Find the UserEbook
      let userEbook = await this.findOneByEbookIdAndUserId(ebookId, userId);

      // Step 2: Update the UserEbook
      userEbook.currentPage = updateUserEbookDto.currentPage;
      userEbook.lastPageRead = updateUserEbookDto.lastPageRead;
      userEbook.lastReadDate = new Date().toISOString();
      userEbook.readingStatus = ReadingStatus.READ;

      // Step 3: Validate the updated UserEbook
      await this.validate(userEbook);

      // Step 4: Save the updated UserEbook
      return await this.update(ebookId, userId, userEbook);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
