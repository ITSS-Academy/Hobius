import { Injectable } from '@angular/core';
import {HttpClientAuth} from "../utils/http-client-auth";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClientAuth) {}
}
