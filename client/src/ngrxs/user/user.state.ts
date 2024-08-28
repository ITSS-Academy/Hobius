import { UserModel } from '../../models/user.model';

export interface UserState {
  user: UserModel | null;
  isGetting: boolean;
  isGettingError: any;

  isCreating: boolean;
  isCreatingError: any;
  isCreatingSuccess: boolean;

  isUpdating: boolean;
  isUpdatingError: any;
  isUpdatingSuccess: boolean;
}
