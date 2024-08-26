import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClientAuth) {}

  searchEbooks(searchTerm: string) {
    return this.http.get(`search/any?q=${searchTerm}`);
  }
}
