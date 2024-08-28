import { CommentModel } from '../../models/comment.model';

export interface CommentState {
  comments: CommentModel[];
  isLoadingComments: boolean;
  isLoadingCommentsError: any;

  selectedComment: CommentModel | null;
  isLoadingSelectedComment: boolean;
  isLoadingSelectedCommentError: any;

  isCreatingComment: boolean;
  isCreatingCommentSuccess: boolean;
  isCreatingCommentError: any;

  isUpdatingComment: boolean;
  isUpdatingCommentSuccess: boolean;
  isUpdatingCommentError: any;

  findingAllEbookId: boolean;
  findingAllEbookIdSuccess: boolean;
  findingAllEbookIdError: any;

  findingAllUserId: boolean;
  findingAllUserIdSuccess: boolean;
  findingAllUserIdError: any;

  findingOne: boolean;
  findingOneSuccess: boolean;
  findingOneError: any;
}
