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

  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.getUserByLogin(this.form.value).subscribe((data) => {
      this.authService.accessToken = data['token'];
      this.userService.getCurrentUser().subscribe((data) => {
        this.userService.user = data['user'];
        this.authService.login();
        this.router.navigate(['/tabs/profile']);
      },
          (message) => { this.errorMessage = message.error; }
      );

    }, (message) => {
      this.errorMessage = message.error;
    });
  }

}
