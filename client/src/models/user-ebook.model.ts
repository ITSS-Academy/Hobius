import { UserModel } from './user.model';
import { EbookModel } from './ebook.model';

export interface UserEbookModel {
  user: UserModel;
  ebook: EbookModel;
  readingStatus: string;
  purchaseDate: string;
  lastReadDate: string;
  lastPageRead: number;
  currentPage: number;
  isLiked: boolean;
}
