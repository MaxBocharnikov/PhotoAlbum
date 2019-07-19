import {Component, Input, OnInit} from '@angular/core';
import {CommentsService} from '../../services/comments.service';
import {commentsTrigger} from '../../animations/comments.animation';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],

})
export class CommentsComponent implements OnInit {
  @Input() photoId: number;
  comments: [Comment];
  constructor(private commentService: CommentsService) { }

  ngOnInit() {
      this.commentService.getCommentsByPhotoId(this.photoId).subscribe((data: {comments}) => {
          this.comments = data.comments;
      })
  }

}
