import {Component, OnInit, ViewChild} from '@angular/core';
import {PhotosService} from '../../shared/services/photos.service';
import {Photo} from '../../shared/interfaces/photo';
import {AlertController, IonInfiniteScroll, LoadingController} from '@ionic/angular';
import {PhotoSortPipe} from "../../shared/pipes/photo-sort.pipe";
@Component({
  selector: 'app-allphotos',
  templateUrl: './allphotos.page.html',
  styleUrls: ['./allphotos.page.scss'],
})
export class AllphotosPage implements OnInit {

  photos: [Photo];
  loadError = false;
  sortType = 'New';

  renderPhotos = [];
  startRenderWith = 0;

  constructor(
      private photosService: PhotosService,
      private alertController: AlertController,
      private photoSortPipe: PhotoSortPipe) {}

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit() {

  }
    ionViewWillEnter() {
        this.getData();
    }
  getData() {
      this.photosService.getAllPhotos().subscribe((data: [Photo]) => {
              this.startRenderWith = 0;
              this.renderPhotos = [];
              this.infiniteScroll.disabled = false;
          this.setDataOnSuccess(data);
          },
          (error) => {
            this.setDataOnError();
          }
      );
  }
    doRefresh(event) {
      this.photosService.getAllPhotos().subscribe((data: [Photo]) => {
              this.startRenderWith = 0;
              this.renderPhotos = [];
              this.infiniteScroll.disabled = false;
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
        this.photos = this.photoSortPipe.transform(this.photos, this.sortType);
        this.addRenderedPhotos();
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
      this.startRenderWith = 0;
      this.renderPhotos = [];
      this.infiniteScroll.disabled = false;
      this.photos = this.photoSortPipe.transform(this.photos, this.sortType);
      this.addRenderedPhotos();
    }
    addRenderedPhotos() {
        const RENDER_COUNT = 2;
        for (let i = this.startRenderWith; i < this.startRenderWith + RENDER_COUNT; i++) {
            if (i > this.photos.length - 1) {
                break;
            }
            this.renderPhotos.push(this.photos[i]);
        }
        this.startRenderWith += RENDER_COUNT;
    }
    renderMorePhotos(event) {
        setTimeout(() => {
            this.addRenderedPhotos();
            event.target.complete();
            if (this.startRenderWith > this.photos.length - 1) {
                event.target.disabled = true;
            }
        }, 1500);

    }

}
