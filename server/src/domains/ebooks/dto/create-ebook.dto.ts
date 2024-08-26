import { Category } from '../../categories/entities/category.entity';
import { IsString, IsArray } from 'class-validator';

export class CreateEbookDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsArray()
  categories: Category[];

  publishedDate: string;

  @IsString()
  image: string;

  @IsString()
  detail: string;

  @IsString()
  pdf: string;

  @IsString()
  author: string;
}
