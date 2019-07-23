import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentsService} from '../../services/comments.service';
import {UserService} from '../../services/user.service';
import {Photo} from '../../interfaces/photo';
import {Comment} from '../../interfaces/comment';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],

})
export class CommentsComponent implements OnInit {
  @Input() photo: Photo;
  @Output() onEdit = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<number>();
    comments: [Comment];
  userId: {};
  constructor(private commentService: CommentsService, private userService: UserService, private alertController: AlertController) { }

  ngOnInit() {
      this.getData();
      this.userId = this.userService.getUser().id;
  }

  getData() {
      this.commentService.getCommentsByPhotoId(this.photo.id).subscribe((data: {comments}) => {
          this.comments = data.comments;
      }, (error) => {
        this.presentLoadErrorAlert();
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
                      this.deleteComment(commentId);
                  }
              }
          ]
      });

      await alert.present();
  }

    async presentLoadErrorAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Comment were not loaded. Try Again',
            buttons: ['OK']
        });

        await alert.present();
    }

    async presentDeleteErrorAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Comment was not deleted. Try Again',
            buttons: ['OK']
        });

        await alert.present();
    }

  deleteComment(commentId) {
    this.commentService.deleteComment(commentId).subscribe(() => {
        this.getData();
        this.onDelete.emit();
    },
        (error) => {
        this.presentDeleteErrorAlert();
    });
  }

}
