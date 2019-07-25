import {ApplicationRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { PhotosService } from '../../shared/services/photos.service';
import { Photo } from '../../shared/interfaces/photo';
import {AlertController, ModalController, PopoverController} from '@ionic/angular';
import { PhotouploadPage } from '../photoupload/photoupload.page';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.page.html',
  styleUrls: ['./myphotos.page.scss'],
})
export class MyphotosPage implements OnInit {

  private user: { id: number};
  private userPhotos: Photo[];
  sortType = 'new';
  constructor(private userService: UserService, private photoService: PhotosService, private modalController: ModalController, private alertController: AlertController, private appRef: ApplicationRef) { }

      ngOnInit() {
        this.user = this.userService.user.id;
        this.getData();
      }

      getData() {
          this.photoService.getUserPhotos(this.user.id).subscribe((data: Photo[]) => {
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
}
