import { CategoryModel } from './category.model';

export interface EbookModel {
  id: string;
  title: string;
  author: string;
  detail: string;
  image: string;
  publishedDate: string;
  view: number;
  like: number;
  pdf: string;
  categories: CategoryModel[];
}
