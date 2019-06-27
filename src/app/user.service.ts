import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLogin = false;

  constructor() { }


  authToggle() {
    this.isLogin = !this.isLogin;
  }

}
