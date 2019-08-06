import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
  });

  errorMessage =  '';

  constructor(
      private userService: UserService,
      private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.getUserByLogin(this.form.value).subscribe((data) => {
      this.authService.setAuthCookie(data);
      this.authService.login();

    }, (message) => {
      this.errorMessage = message.error;
    });
  }

}
