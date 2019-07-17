import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Photo} from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  url = 'http://localhost:3000/photos';
  constructor(private http: HttpClient) { }

  getAllPhotos() {
        return this.http.get(this.url + '/getAllPhotos');
  }

  getUserPhotos(id: number) {
    return this.http.get(`${this.url}?authorId=${id}`);
  }

  addUserPhoto(photo: Photo) {
    return this.http.post(this.url, photo);
  }

  editUserPhoto(photo: Photo) {
    return this.http.put(`${this.url}/${photo.id}`, photo);
  }

  deleteUserPhoto(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
