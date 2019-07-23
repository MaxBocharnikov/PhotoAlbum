import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: {id: number, name: string} = {
    id: 1,
    name: 'Max Bocharnikov'
  };

  getUser(): {id: number, name: string} {
    return this.user;
  }
  constructor() { }

}
