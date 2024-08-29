import { UserModel } from './user.model';
import { EbookModel } from './ebook.model';

export interface CommentModel {
  user: UserModel;
  ebook: EbookModel;
  commentDate: string;
  content: string;
}
