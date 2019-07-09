import { Pipe, PipeTransform } from '@angular/core';
import {Photo} from '../interfaces/photo';

@Pipe({
  name: 'photoSort'
})
export class PhotoSortPipe implements PipeTransform {

  transform(photos: [Photo], type: string): [Photo] {
    if (typeof  photos === 'undefined') { return; }
    switch (type) {
        case 'popular':
            return photos.sort((left: any, right: any) => {
                return right.rating - left.rating;
            });
            break;
        default:
        return photos.sort((left: any, right: any) =>  {
          return +new Date(right.date) - +new Date(left.date);
        });
        break;
    }
  }

}
