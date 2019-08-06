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
        case 'Popular':
            return photos.sort((left: any, right: any) => {
                return right.likes - left.likes;
            });
            break;
        case 'Alphabetical':
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
        default:
        return photos.sort((left: any, right: any) =>  {
          return +new Date(right.uploadDate) - +new Date(left.uploadDate);
        });
        break;
    }
  }

}
