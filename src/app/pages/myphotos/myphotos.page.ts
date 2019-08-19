import {ApplicationRef, Component, OnInit} from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { PhotosService } from '../../shared/services/photos.service';
import { Photo } from '../../shared/interfaces/photo';
import {AlertController, ModalController} from '@ionic/angular';
import { PhotouploadPage } from '../photoupload/photoupload.page';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.page.html',
  styleUrls: ['./myphotos.page.scss'],
})
export class MyphotosPage implements OnInit {

  private userPhotos: Photo[];
  sortType = 'New';
  constructor(
      private userService: UserService,
      private photoService: PhotosService,
      private modalController: ModalController,
      private alertController: AlertController,
      private appRef: ApplicationRef) { }

      ngOnInit() {}
    ionViewWillEnter() {
        this.getData();
    }
      getData() {
          this.photoService.getUserPhotos(this.userService.user.id).subscribe((data: Photo[]) => {
                  this.userPhotos = data;
              },
              (error) => {
                  this.presentAlert();
              }
          );
      }
     async addPhoto() {
          const modal = await this.modalController.create({
              component: PhotouploadPage,
              componentProps: {
                  isNew: true
              }
          });
          modal.onDidDismiss()
             .then((data) => {
                 const photo = data.data;
                 if (typeof photo !== 'undefined') {
                     this.userPhotos.push(photo);
                 }
             });
          return await modal.present();
      }
      async presentAlert() {
          const alert = await this.alertController.create({
              header: 'Failed to Load',
              message: 'Something went wrong. Please refresh this page',
              buttons: ['OK']
          });

          await alert.present();
      }
      onDeleteEvent(id: number) {
          this.userPhotos = this.userPhotos.filter((photo) => photo.id !== id);
          this.appRef.tick();
      }
      changeSort(type: string) {
         this.sortType = type;
      }

    doRefresh(event) {
      this.getData();
        setTimeout(() => {
            event.target.complete();
        }, 500);
    }

}
