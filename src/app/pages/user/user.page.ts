import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  constructor(private userService: UserService) {}
  
  ngOnInit() {
  }

  toggleLog() {
    this.userService.authToggle();
  }

}
