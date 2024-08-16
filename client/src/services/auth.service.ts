import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from '@angular/fire/auth';
import { from, of } from 'rxjs';
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
    return this.http.post<{ access_token: string }>(
      `${environment.apiUrl}/auth/login`,
      {
        email: email,
        password: password,
      },
    );
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
