export interface FileUploadState {
  isLoading: boolean;
  downloadCoverURL: string | null;
  downloadPdfURL: string | null;
  downloadAvatarURL: string | null;
  downloadWallpaperURL: string | null;
  error: any;
}
