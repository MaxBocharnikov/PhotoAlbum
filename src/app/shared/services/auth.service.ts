import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthicated = false;
  public accessToken = null;
  constructor(private userService: UserService, private router: Router, private alertController: AlertController) { }

  login() {
    this.isAuthicated = true;
  }

  logout() {
      console.log('logout');
      this.isAuthicated = false;
      this.accessToken = null;
      this.userService.user = null;
      console.log(this.accessToken);
  }

  isLogin(): boolean {
    return this.isAuthicated;
  }


  onLogin(data) {
      this.accessToken = data['token'];
      this.userService.getCurrentUser().subscribe((data) => {
              this.userService.user = data['user'];
              this.login();
              this.router.navigate(['/tabs/myphotos']);
          },
      () => {
        this.presentAlert();
      }
      );
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
