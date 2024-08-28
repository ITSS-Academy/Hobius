import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../utils/http-client-auth';
import { updateComment } from '../ngrxs/comment/comment.actions';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClientAuth) {}

  create(comment: any) {
    return this.http.post('ebook-comments', comment);
  }

  findAllEbookId(ebookId: string) {
    return this.http.get(`ebook-comments/ebook/${ebookId}`);
  }

  findAllUserId(userId: string) {
    return this.http.get(`ebook-comments/user/${userId}`);
  }

  findOne(userId: string, ebookId: string) {
    return this.http.get(`ebook-comments/${userId}/${ebookId}`);
  }

  updateComment(comment: any) {
    return this.http.patch(
      `ebook-comments/${comment.userId}/${comment.ebookId}`,
      comment,
    );
  }
}
