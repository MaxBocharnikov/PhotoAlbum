import { Component, OnInit } from '@angular/core';
import {PhotosService} from '../../shared/services/photos.service';
import {Photo} from '../../shared/interfaces/photo';
import {AlertController, LoadingController} from '@ionic/angular';
@Component({
  selector: 'app-allphotos',
  templateUrl: './allphotos.page.html',
  styleUrls: ['./allphotos.page.scss'],
})
export class AllphotosPage implements OnInit {

  photos: [Photo];
  loadError = false;
  sortType = 'new';

  constructor(private photosService: PhotosService, private alertController: AlertController, private loadingController: LoadingController) {
  }

  ngOnInit() {
      this.getData();
  }

  getData() {
      this.photosService.getAllPhotos().subscribe((data: [Photo]) => {
              this.setDataOnSuccess(data);
          },
          (error) => {
              this.setDataOnError();
          }
      );
  }

    doRefresh(event) {
      this.photosService.getAllPhotos().subscribe((data: [Photo]) => {  // Повторение кода в ngOnInit. Необоходимо продумать структуру.
              this.setDataOnSuccess(data);
              setTimeout(() => {
                  event.target.complete();
              }, 500);
            },
            (error) => {
                this.setDataOnError();
                setTimeout(() => {
                    event.target.complete();
                }, 500);
            }
        );
    }

    setDataOnSuccess(data: [Photo]) {
        this.photos = data;
    }

    setDataOnError() {
        this.loadError = true;
        this.presentAlert();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Failed to Load',
            message: 'Something went wrong. Please refresh this page',
            buttons: ['OK']
        });

        await alert.present();
    }

    changeSort(type: string) {
      this.sortType = type;
    }

   /* async showLoader() {
        this.loading = await this.loadingController.create({
            message: 'Loading...'
        });
        return await this.loading.present();
    }*/

}
