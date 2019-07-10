import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { PhotosService } from '../../shared/services/photos.service';
import { Photo } from '../../shared/interfaces/photo';

@Component({
  selector: 'app-myphotos',
  templateUrl: './myphotos.page.html',
  styleUrls: ['./myphotos.page.scss'],
})
export class MyphotosPage implements OnInit {

  private user: { id: number};
  private userPhotos: Photo;
  constructor(private userService: UserService, private photoService: PhotosService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.photoService.getUserPhotos(this.user.id).subscribe((data: Photo) => {
        this.userPhotos = data;
      },
          (error) => {
            console.log('error');
          }
      );
  }

}
