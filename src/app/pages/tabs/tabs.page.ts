import { Component, OnInit } from '@angular/core';
import { UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(
      private authService: AuthService,
      private userService: UserService) {}

  ngOnInit() {
  }

}
