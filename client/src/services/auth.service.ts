import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from '@angular/fire/auth';
import { from, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private http: HttpClient,
  ) {}

  signInWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError((error: any) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Error:', {
          errorCode,
          errorMessage,
          email,
          credential,
        });
        return of(credential);
      }),
    );
  }

  signInWithStaticUser(email: string, password: string) {
    return this.http
      .post<{ access_token: string }>(`${environment.apiUrl}/auth/login`, {
        email: email,
        password: password,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Đang xảy ra lỗi`;
    } else {
      // Backend error
      errorMessage = `Đang xảy ra lỗi`;
    }
    return throwError(errorMessage);
  }

  logout() {
    return from(signOut(this.auth)).pipe(
      catchError((error: any) => {
        console.error('Error:', error);
        return of(error);
      }),
    );
  }
}
