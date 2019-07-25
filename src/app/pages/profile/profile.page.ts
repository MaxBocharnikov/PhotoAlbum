import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
