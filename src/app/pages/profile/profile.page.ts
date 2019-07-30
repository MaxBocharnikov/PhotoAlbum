import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    @ViewChild('login') login;

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private alertController: AlertController) { }

    form = new FormGroup({
        login: new FormControl(this.userService.user.login, [Validators.required]),
        name: new FormControl(this.userService.user.name, [Validators.required]),
    });

    errorMessage =  '';
    isEditMode = false;


  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
    window.location.replace('tabs/login');
    //this.router.navigate(['/tabs/login']);
  }


  edit() {
    this.isEditMode = true;
    this.login.setFocus();
  }

  save() {
    console.log(this.form.value);
    this.userService.changeUser(this.form.value).subscribe(() => {
        this.isEditMode = false;
    }, () => {
      this.presentAlert();
    });
  }

  async presentAlert() {
      const alert = await this.alertController.create({
          header: 'Error',
          message: 'Something went wrong. Please repeat',
          buttons: ['OK']
      });

      await alert.present();
  }

}
