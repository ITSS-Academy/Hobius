import { CategoryModel } from './category.model';

export interface EbookModel {
  id: string;
  title: string;
  author: string;
  detail: string;
  image: string;
  date: string;
  view: number;
  like: number;
  pdf: string;
  categories: CategoryModel[];
}
