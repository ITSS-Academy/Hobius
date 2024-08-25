import { Category } from '../../categories/entities/category.entity';

export class CreateEbookDto {
  id: string;
  title: string;
  categories: Category[];
  publishedDate: string;
  image: string;
  detail: string;
  pdf: string;
  author: string;
}
