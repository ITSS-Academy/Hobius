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

  update(userId: string, ebookId: string, userEbook: UserEbookModel) {
    return this.http.put(
      `user-ebooks/one?userId=${userId}&ebookId=${ebookId}`,
      userEbook,
    );
  }

  findAllByUserId(userId: string) {
    return this.http.get(`user-ebooks/history/user/${userId}`);
  }

  read(userId: string, ebookId: string, userEbook: UserEbookModel) {
    return this.http.put(
      `user-ebooks/read?userId=${userId}&ebookId=${ebookId}`,
      userEbook,
    );
  }

  finishReading(userId: string, ebookId: string, userEbook: UserEbookModel) {
    return this.http.put(
      `user-ebooks/finish-reading?userId=${userId}&ebookId=${ebookId}`,
      userEbook,
    );
  }
}
