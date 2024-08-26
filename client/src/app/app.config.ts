import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { fileUploadReducer } from '../ngrxs/file-upload/file-upload.reducer';
import { FileUploadEffects } from '../ngrxs/file-upload/file-upload.effects';
import { authReducer } from '../ngrxs/auth/auth.reducer';
import { AuthEffects } from '../ngrxs/auth/auth.effects';
import { userReducer } from '../ngrxs/user/user.reducer';
import { UserEffects } from '../ngrxs/user/user.effects';
import { HttpClientAuth } from '../utils/http-client-auth';
import { ebookReducer } from '../ngrxs/ebook/ebook.reducer';
import { EbookEffects } from '../ngrxs/ebook/ebook.effects';
import { categoryReducer } from '../ngrxs/category/category.reducer';
import { CategoryEffects } from '../ngrxs/category/category.effects';
import { UserEbookEffects } from '../ngrxs/user-ebook/user-ebook.effects';
import { userEbookReducer } from '../ngrxs/user-ebook/user-ebook.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    HttpClientAuth,
    provideAnimationsAsync(),
    provideEffects(
      FileUploadEffects,
      AuthEffects,
      UserEffects,
      EbookEffects,
      CategoryEffects,
      UserEbookEffects,
    ),
    provideStore({
      file_upload: fileUploadReducer,
      auth: authReducer,
      user: userReducer,
      ebook: ebookReducer,
      category: categoryReducer,
      user_ebook: userEbookReducer,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
};
