import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: {id: number} = {
    id: 1
  };

  getUser(): {id: number} {
    return this.user;
  }
  constructor() { }

}
