import { CategoryModel } from '../../models/category.model';

export interface CategoryState {
  categories: CategoryModel[];
  isLoading: boolean;
  error: any;
}
