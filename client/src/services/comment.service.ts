import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClientAuth) {}

  create(comment: CommentModel) {
    return this.http.post('ebook-comments', comment);
  }

  findAllByEbookId(ebookId: string) {
    return this.http.get(`ebook-comments/all/ebook/${ebookId}`);
  }

  findAllByUserId() {
    return this.http.get(`ebook-comments/all/user`);
  }

  findOne(ebookId: string) {
    return this.http.get(`ebook-comments/one?ebookId=${ebookId}`);
  }

  update(comment: CommentModel) {
    return this.http.patch(`ebook-comments?ebookId=${comment.ebook}`, comment);
  }
}
