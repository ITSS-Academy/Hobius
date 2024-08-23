import { Category } from '../../categories/entities/category.entity';

export class CreateEbookDto {
  id: string;
  title: string;
  publisher: string;
  isbn: string;
  categories: Category[];
  publishedDate: string;
  language: string;
  coverImageURL: string;
  summary: string;
  filePath: string;
}
