import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { UserEbookModel } from '../models/user-ebook.model';

@Injectable({
  providedIn: 'root',
})
export class UserEbookService {
  constructor(private http: HttpClientAuth) {}

  create(userEbook: UserEbookModel) {
    return this.http.post('user-ebooks', userEbook);
  }

  findAllByUserId() {
    return this.http.get(`user-ebooks/history/user`);
  }

  findOneByEbookIdAndUserId(ebookId: string) {
    return this.http.get(`user-ebooks/one?ebookId=${ebookId}`);
  }

  read(ebookId: string, userEbook: UserEbookModel) {
    return this.http.put(`user-ebooks/read?ebookId=${ebookId}`, userEbook);
  }

  finishReading(ebookId: string, userEbook: UserEbookModel) {
    return this.http.put(
      `user-ebooks/finish-reading?ebookId=${ebookId}`,
      userEbook,
    );
  }
}
