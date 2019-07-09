import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../interfaces/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
})
export class PhotoComponent implements OnInit {
  @Input('photoItem') photo: Photo;

  isCommentsShow = false;

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

    toggleComments() {
      this.isCommentsShow = !this.isCommentsShow;
    }


}
