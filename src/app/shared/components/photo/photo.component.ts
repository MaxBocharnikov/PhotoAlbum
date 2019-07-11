import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import { commentsTrigger } from '../../animations/comments.animation';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
    animations: [commentsTrigger]
})
export class PhotoComponent implements OnInit {
  @Input() photo: Photo;
  @Input() profileMod = false;
  constructor(private actionSheetController: ActionSheetController) { }

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
                  console.log('Delete clicked');
              }
          }, {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                  console.log('Cancel clicked');
              }
          }
          ]
      });
      await actionSheet.present();
  }

}
