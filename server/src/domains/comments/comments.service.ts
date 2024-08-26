import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async validate(cmt: Comment) {
    // Validate the DTO
    const validationErrors = await validate(cmt);
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

  async create(createCommentDto: CreateCommentDto) {
    try {
      let cmt = this.commentsRepository.create(createCommentDto);
      cmt.commentDate = new Date().toISOString();

      await this.validate(cmt);

      // Proceed to save the review if validation passes
      await this.commentsRepository.save(cmt);
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByEbookId(ebookId: string) {
    try {
      return await this.commentsRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .select(['comment', 'user.id', 'user.userName', 'user.avatarURL'])
        .where('comment.ebookId = :ebookId', { ebookId })
        .getMany();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByUserId(userId: string) {
    try {
      return await this.commentsRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.ebook', 'ebook')
        .select([
          'comment',
          'user.id',
          'user.userName',
          'user.avatarURL',
          'ebook.id',
          'ebook.title',
          'ebook.image',
          'ebook.author',
        ])
        .where('comment.userId = :userId', { userId })
        .getMany();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async findOneByEbookIdAndUserId(ebookId: string, userId: string) {
    try {
      return await this.commentsRepository
        .createQueryBuilder('comment')
        .leftJoinAndSelect('comment.user', 'user')
        .leftJoinAndSelect('comment.ebook', 'ebook')
        .select([
          'comment',
          'user.id',
          'user.userName',
          'user.avatarURL',
          'ebook.id',
          'ebook.title',
        ])
        .where('comment.ebookId = :ebookId', { ebookId })
        .andWhere('comment.userId = :userId', { userId })
        .getOne();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    ebookId: string,
    userId: string,
    updateCommentDto: UpdateCommentDto,
  ) {
    try {
      // Step 1: Find the Review
      let review = await this.findOneByEbookIdAndUserId(ebookId, userId);

      // Step 2: Update the Review
      review.content = updateCommentDto.content;
      review.commentDate = new Date().toISOString();

      // Step 3: Validate the Updated Entity
      await this.validate(review);

      // Step 4: Save the Updated Review
      await this.commentsRepository
        .createQueryBuilder()
        .update(Comment)
        .set(updateCommentDto)
        .where('ebookId = :ebookId AND userId = :userId', { ebookId, userId })
        .execute();
      // Step 5: Return the Updated Review
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(ebookId: string, userId: string) {
    try {
      await this.commentsRepository
        .createQueryBuilder()
        .delete()
        .from(Comment)
        .where('ebookId = :ebookId AND userId = :userId', { ebookId, userId })
        .execute();
      return;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
