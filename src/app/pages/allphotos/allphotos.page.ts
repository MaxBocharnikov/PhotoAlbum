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

  photos: Photo;
  loadError = false;
  sorting = {
      sortBy: 'new',
      newerNameLabel: 'on',
      popularNameLabel: 'off'
  };

  loading = null;

  constructor(private photosService: PhotosService, public alertController: AlertController, public loadingController: LoadingController) {
  }

  ngOnInit() {
      this.showLoader();
      this.photosService.getAllPhotos().subscribe((data: Photo) => {
              this.photos = data;
              setTimeout(() => {
                  console.log()
                  this.loading.dismiss();
              }, 2000);
          },
          (error) => {
              this.loadError = true;
              setTimeout(() => {
                  this.loading.dismiss();
              }, 2000);
              this.presentAlert();
          }
      );
  }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Failed to Load',
            message: 'Something went wrong. Please refresh this page',
            buttons: ['OK']
        });

        await alert.present();
    }

    changeSortType(type: string) {
      this.sorting.sortBy = type;
      if (this.sorting.newerNameLabel === 'on') {
          this.sorting.newerNameLabel = 'off';
          this.sorting.popularNameLabel = 'on';
      } else {
          this.sorting.newerNameLabel = 'on';
          this.sorting.popularNameLabel = 'off';
      }
    }

    async showLoader() {
        this.loading = await this.loadingController.create({
            message: 'Loading...'
        });
        return await this.loading.present();
    }

}
