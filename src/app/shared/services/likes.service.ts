import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

    url = 'http://localhost:3000/likes';

  constructor(private http: HttpClient) { }

  addLike(photoId) {
    return this.http.post(this.url, {photoId});
  }

  removeLike(photoId) {
      return this.http.delete(this.url + '/' + photoId);
  }

  isLiked(photoId) {
        return this.http.get(this.url + '/isLiked/' + photoId);
  }

}
