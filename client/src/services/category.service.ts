import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClientAuth) {}

  getAll() {
    return this.http.get('categories');
  }
}
