import { UserEbookModel } from '../../models/user-ebook.model';

export interface UserEbookState {
  readingHistoryList: UserEbookModel[];
  isLoadingReadingHistoryList: boolean;
  errorReadingHistoryList: any;

  currentReading: UserEbookModel | null;
  isLoadingCurrentReading: boolean;
  errorCurrentReading: any;

  isCreating: boolean;
  isCreatingSuccess: boolean;
  errorCreating: any;

  isUpdating: boolean;
  isUpdatingSuccess: boolean;
  errorUpdating: any;
}
