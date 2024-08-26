import { EbookModel } from '../../models/ebook.model';

export interface EbookState {
  ebooks: EbookModel[];
  isLoadingEbooks: boolean;
  isLoadingEbooksError: any;

  selectedEbook: EbookModel | null;
  isLoadingSelectedEbook: boolean;
  isLoadingSelectedEbookError: any;

  isCreatingEbook: boolean;
  isCreatingEbookSuccess: boolean;
  isCreatingEbookError: any;

  isUpdatingEbook: boolean;
  isUpdatingEbookSuccess: boolean;
  isUpdatingEbookError: any;

  trendingEbooks: EbookModel[];
  isLoadingTrendingEbooks: boolean;
  isLoadingTrendingEbooksError: any;

  recommendEbooks: EbookModel[];
  isLoadingRecommendEbooks: boolean;
  isLoadingRecommendEbooksError: any;

  ratingEbooks: EbookModel[];
  isLoadingRatingEbooks: boolean;
  isLoadingRatingEbooksError: any;
}
