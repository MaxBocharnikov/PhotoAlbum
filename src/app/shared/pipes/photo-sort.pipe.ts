import { Pipe, PipeTransform } from '@angular/core';
import {Photo} from '../interfaces/photo';

@Pipe({
  name: 'photoSort',
  pure: false
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
        case 'alphabet':
            return photos.sort((left: any, right: any) => {
                const x  = left.title.toLowerCase();
                const y = right.title.toLowerCase();
                if (x < y) {
                    return -1;
                }
                if (x > y) {
                    return 1;
                }
                return 0;
            });
            break;
        case 'favorite':
            return photos.sort((left: any, right: any) => {
                return right.likes - left.likes;
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
