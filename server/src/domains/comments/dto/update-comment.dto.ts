import { PartialType } from '@nestjs/mapped-types';
import { CreateEbookCommentDto } from './create-comment.dto';

export class UpdateEbookCommentDto extends PartialType(CreateEbookCommentDto) {}
