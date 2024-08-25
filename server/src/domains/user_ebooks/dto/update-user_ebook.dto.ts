import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEbookDto } from './create-user_ebook.dto';

export class UpdateUserEbookDto extends PartialType(CreateUserEbookDto) {
  isLiked: boolean;
}
