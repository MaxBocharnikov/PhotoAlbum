import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {filter, map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  url = 'http://localhost:3000/photos';
  constructor(private http: HttpClient) { }

  getAllPhotos() {
        return this.http.get(this.url);
  }

  getUserPhotos(id: number) {
    return this.http.get(`${this.url}?authorId=${id}`);
  }
}
