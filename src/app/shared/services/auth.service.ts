import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthicated = false;
  public accessToken = null;
  constructor(private userService: UserService, private router: Router, private alertController: AlertController, private cookieService: CookieService) { }


  setAuthCookie(data) {
      this.cookieService.set('accessToken', data['token']);
  }


  login() {
      this.userService.getCurrentUser().subscribe((data) => {
              this.userService.user = data['user'];
              this.isAuthicated = true;
              this.router.navigate(['/tabs/myphotos']);
          },
          () => {
              this.presentAlert();
          }
      );
  }


  logout() {
      this.cookieService.delete('accessToken');
  }

  isLogin(): boolean {
    return this.isAuthicated;
  }


  async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Failed to get user. Please sign out and sign in again',
            buttons: ['OK']
        });

        await alert.present();
    }

}
