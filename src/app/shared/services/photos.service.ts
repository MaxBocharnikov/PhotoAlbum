import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  url = 'http://localhost:3000/photos';
  constructor(private http: HttpClient) { }

  getAllPhotos() {
        return this.http.get(this.url);
  }
}
