import {Component, Input, OnInit} from '@angular/core';
import {commentsTrigger} from '../../animations/comments.animation';
import {Photo} from '../../interfaces/photo';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
    animations: [commentsTrigger]
})
export class CommentsComponent implements OnInit {
  @Input() comments: {};
  @Input() photo: Photo;
  isCommentsShow = false;

  constructor() { }

  ngOnInit() {}

  toggleComments(event) {
      const comments = event.target.attributes.comments.value;
      if (!+event.target.attributes.checked.value) {
          event.target.textContent = `Hide Comments (${comments})`;
          event.target.attributes.checked.value = 1;
          this. isCommentsShow = true;

      } else {
          event.target.textContent = `Show Comments (${comments})`;
          event.target.attributes.checked.value = 0;
          this. isCommentsShow = false;
      }
  }

}
