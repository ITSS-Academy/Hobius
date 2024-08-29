import { CommentModel } from '../../models/comment.model';

export interface CommentState {
  selectedComment: CommentModel | null;
  isLoadingSelectedComment: boolean;
  isLoadingSelectedCommentError: any;

  isCreatingComment: boolean;
  isCreatingCommentSuccess: boolean;
  isCreatingCommentError: any;

  isUpdatingComment: boolean;
  isUpdatingCommentSuccess: boolean;
  isUpdatingCommentError: any;

  ebookCommentList: CommentModel[];
  isFindingAllByEbookId: boolean;
  findingAllByEbookIdError: any;

  userCommentList: CommentModel[];
  isFindingAllByUserId: boolean;
  findingAllByUserIdError: any;
}
