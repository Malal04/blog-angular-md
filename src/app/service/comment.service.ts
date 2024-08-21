import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient ) { }

  createComment(postId:number, postedBy: string, content:string) :Observable<any> {
    const params = {
      postId: postId,
      postedBy: postedBy,
    }

    const boby = {
      content: content
    }


    return this.http.post(`${BASIC_URL}/api/v1/comments/create`, boby ,{params});
  }


  getAllCommentsByPost(postId:number) :Observable<any> {
    return this.http.get(`${BASIC_URL}/api/v1/comments/${postId}`);
  }


}
