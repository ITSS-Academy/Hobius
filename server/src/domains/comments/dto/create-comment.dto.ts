import { Ebook } from '../../ebooks/entities/ebook.entity';
import { User } from '../../users/entities/user.entity';

export class CreateCommentDto {
  ebook: Ebook;
  user: User;
  content: string;
  commentDate: string;
}
