import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import { commentsTrigger } from '../../animations/comments.animation';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
    animations: [commentsTrigger]
})
export class PhotoComponent implements OnInit {
  @Input('photoList') photos: [Photo];

  constructor() { }

  ngOnInit() {
  }

    getStars(rating: number): {} {
        const STARS_AMOUNT = 5;
        return {
            star: new Array(rating),
            starOut: new Array(STARS_AMOUNT - rating)
        };
    }

}
