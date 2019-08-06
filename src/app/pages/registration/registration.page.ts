import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  form: FormGroup;
  errorMessage =  '';

  constructor(
      private userService: UserService,
      private authService: AuthService) { }

  ngOnInit() {
      this.form = new FormGroup({
          login: new FormControl('', [Validators.required], this.checkExistanceLogin.bind(this)),
          name: new FormControl('', [Validators.required]),
          password: new FormControl('', [Validators.required]),
          rpassword: new FormControl('', [Validators.required, this.checkRepeatPasswordEquals.bind(this)]),
      });
  }

  onSubmit() {
    this.userService.register(this.form.value).subscribe((data) => {
        this.authService.setAuthCookie(data);
        this.authService.login();
    }, () => {
      this.errorMessage = 'Something went wrong. Please repeat your attempt';
    })
  }

  checkRepeatPasswordEquals(control: FormGroup) {
    if (this.form) {
      if (control.value !== this.form.value.password) {
          return {
              checkRepeatPasswordEquals: true
          };
      }
    }
    return false;
  }

  checkExistanceLogin(control: FormGroup) {
    return new Promise((resolve, reject) => {
      this.userService.checkLoginExistence(control).subscribe((data: {answer: boolean}) => {
        if (data.answer) {
          resolve({
              loginExistanceError: true
          });
        } else {
          resolve(null);
        }
      })
    })
  }
}
