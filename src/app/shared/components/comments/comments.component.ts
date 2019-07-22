import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentsService} from '../../services/comments.service';
import {UserService} from '../../services/user.service';
import {Photo} from '../../interfaces/photo';
import {Comment} from "../../interfaces/comment";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],

})
export class CommentsComponent implements OnInit {
  @Input() photo: Photo;
  @Output() onEdit = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<boolean>();
    comments: [Comment];
  userId: {};
  constructor(private commentService: CommentsService, private userService: UserService) { }

  ngOnInit() {
      this.getData();
      this.userId = this.userService.getUser().id;
  }

  getData() {
      this.commentService.getCommentsByPhotoId(this.photo.id).subscribe((data: {comments}) => {
          this.comments = data.comments;
      });
  }

  deleteComment(commentId) {
    this.commentService.deleteComment(commentId).subscribe(() => {
        this.onDelete.emit();
    })
  }

}
