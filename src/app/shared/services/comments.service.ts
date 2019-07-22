import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
    url = 'http://localhost:3000/comments';

    constructor(private http: HttpClient) { }

    getCommentsByPhotoId(photoId) {
        return this.http.get(this.url + `/getCommentsByPhotoId/${photoId}`);
    }

    addComment(photoId, text) {
        const body = {postId: photoId, text};
        return this.http.post(this.url, body);
    }
}
