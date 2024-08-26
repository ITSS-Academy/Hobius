import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { EbookModel } from '../models/ebook.model';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  constructor(private http: HttpClientAuth) {}

  create(ebook: EbookModel) {
    return this.http.post('ebooks', ebook);
  }

  findAll() {
    return this.http.get('ebooks');
  }

  listByTrend(limit: number) {
    return this.http.get(`ebooks/trend?limit=${limit}`);
  }

  listByRecommend(limit: number) {
    return this.http.get(`ebooks/recommend?limit=${limit}`);
  }

  listByRating(limit: number) {
    return this.http.get(`ebooks/rating?limit=${limit}`);
  }

  findOne(id: string) {
    return this.http.get(`ebooks/${id}`);
  }

  update(id: string, ebook: EbookModel) {
    return this.http.patch(`ebooks/${id}`, ebook);
  }
}