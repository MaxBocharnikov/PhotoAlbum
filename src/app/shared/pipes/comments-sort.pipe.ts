import { Pipe, PipeTransform } from '@angular/core';
import {Comment} from '../interfaces/comment';

@Pipe({
  name: 'commentsSort'
})
export class CommentsSortPipe implements PipeTransform {

  transform(comments: [Comment]): [Comment] {
    if(comments) {
        return comments.sort((left, right) => {
            return +new Date(right.date) - +new Date(left.date);
        });
    }
  }

}
