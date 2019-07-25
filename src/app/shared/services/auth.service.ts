import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthicated = false;
  public accessToken = null;
  constructor() { }

  login() {
    this.isAuthicated = true;
  }

  logout() {
      this.isAuthicated = false;
  }

  isLogin(): boolean {
    return this.isAuthicated;
  }


}
