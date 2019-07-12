import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import { commentsTrigger } from '../../animations/comments.animation';
import {ActionSheetController, AlertController} from '@ionic/angular';
import {PhotosService} from '../../services/photos.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
    animations: [commentsTrigger]
})
export class PhotoComponent implements OnInit {
  @Input() photo: Photo;
  @Input() profileMod = false;
  @Output() onDelete = new EventEmitter<number>();
  constructor(private actionSheetController: ActionSheetController, private photoService: PhotosService,  private alertController: AlertController) { }

  ngOnInit() {
  }


  getStars(rating: number): {} {
      const STARS_AMOUNT = 5;
      return {
          star: new Array(rating),
          starOut: new Array(STARS_AMOUNT - rating)
      };
  }

  async showActions() {
      const actionSheet = await this.actionSheetController.create({
          header: 'Albums',
          buttons: [{
              text: 'Edit',
              icon: 'create',
              handler: () => {
                  console.log('Share clicked');
              }
          }, {
              text: 'Delete',
              role: 'destructive',
              icon: 'trash',
              handler: () => {
                  this.presentAlertConfirm();
              }
          }, {
              text: 'Cancel',
              role: 'cancel'
          }
          ]
      });
      await actionSheet.present();
  }

  deletePhoto(id: number) {
      this.photoService.deleteUserPhoto(id).subscribe(() => {
          this.onDelete.emit(id);
      }, () => {
          this.presentAlert();
      });
  }
  async presentAlert() {
      const alert = await this.alertController.create({
          header: 'Failed',
          message: 'Something went wrong. Please repeat your attempt',
          buttons: ['OK']
      });

      await alert.present();
  }
    async presentAlertConfirm() {
      const alert = await this.alertController.create({
          header: 'Deleting confirm!',
          message: 'Are you sure you wanna delete this photo?',
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel'
              }, {
                  text: 'Okay',
                  handler: () => {
                      this.deletePhoto(this.photo.id);
                  }
              }
          ]
      });
      await alert.present();
    }
}
