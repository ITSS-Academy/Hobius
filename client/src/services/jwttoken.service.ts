import { Injectable } from '@angular/core';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { SessionStorageService } from './session-storage.service';
import { Store } from '@ngrx/store';
import * as AuthActions from '../ngrxs/auth/auth.actions';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class JWTTokenService {
  jwtToken: string = '';
  decodedToken: JwtPayload | null = null;

  constructor(private store: Store) {}

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode<JwtPayload>(this.jwtToken);
    }
  }

  getDecodeToken() {
    return jwtDecode<JwtPayload>(this.jwtToken);
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime();
    if (expiryTime != null) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }

  alertTokenExpired() {
    alert('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!');
    this.store.dispatch(AuthActions.signOut());
    this.setToken('');
  }

  checkTokenExpired() {
    if (this.isTokenExpired()) {
      this.alertTokenExpired();
    }
  }
}
