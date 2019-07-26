import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000';
  user = null;
  constructor(private http: HttpClient) { }

  getUserByLogin(data){
    return this.http.post(this.url + '/login', data);
  }

  getCurrentUser() {
    return this.http.get(this.url + '/current-user');
  }

  checkLoginExistence(login) {
    return this.http.post(this.url + '/checkUserExistance', {login: login.value});
  }

  register(data) {
    return this.http.post(this.url + '/register', data);
  }

}
