import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {Photo} from '../../interfaces/photo';
import {CommentsService} from '../../services/comments.service';
import {Comment} from "../../interfaces/comment";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
    @ViewChild('commentInput') commentInput;

  @Input() comment: Comment;
  @Input() photo: Photo;
  @Output() onDeleteClick = new EventEmitter<number>();
  editMode = false;
  commentUploadText = '';

  constructor(
      private userService: UserService,
      private alertController: AlertController,
      private authService: AuthService,
      private commentService: CommentsService) { }
  ngOnInit() {}

  editCommentButtonClick() {
      this.editMode = true;
      this.commentInput.setFocus();
      this.commentUploadText = this.comment.text;
  }

  editComment() {
      this.commentService.editComment(this.comment.id, this.commentUploadText).subscribe(() => {
          this.comment.text = this.commentUploadText;
          this.commentUploadText = '';
          this.comment.id = null;
          this.editMode = false;
      }, () => {
          this.presentUploadErrorAlert();
      });
  }

    async presentAlertDeletingConfirm(commentId) {
    const alert = await this.alertController.create({
        header: 'Delete Confirm',
        message: 'Are you sure you want to delete this comment?',
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                }
            }, {
                text: 'Okay',
                handler: () => {
                    this.onDeleteClick.emit(commentId)
                }
            }
        ]
    });
        await alert.present();
  }

    async presentUploadErrorAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Comment was not edited. Try Again',
            buttons: ['OK']
        });

        await alert.present();
    }


}
