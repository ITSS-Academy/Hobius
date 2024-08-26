import { EbookModel } from '../../models/ebook.model';

export interface SearchState {
  searchResults: EbookModel[];
  loading: boolean;
  error: any;
}
