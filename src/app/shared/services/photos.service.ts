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
    return this.http.get(this.url + '/getUserPhotos');
  }

  addUserPhoto(data) {
    const form = new FormData();
    form.append('file', data.file);
    form.append('title', data.title);
    form.append('description', data.description);
    return this.http.post(this.url, form);
  }

  editUserPhoto(photo) {
    return this.http.put(`${this.url}/${photo.id}`, photo);
  }

  deleteUserPhoto(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
