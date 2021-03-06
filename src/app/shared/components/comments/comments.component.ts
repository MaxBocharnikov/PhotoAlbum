import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CommentsService} from '../../services/comments.service';
import {Photo} from '../../interfaces/photo';
import {Comment} from '../../interfaces/comment';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],

})
export class CommentsComponent implements OnInit, OnDestroy  {
  @Input() photo: Photo;
  @Output() onDelete = new EventEmitter<number>();
  @Output() onLoad = new EventEmitter();
    comments: [Comment];
  constructor(private commentService: CommentsService, private alertController: AlertController) { }

  ngOnInit() {
      this.getData();
  }

  ngOnDestroy() {
      this.onLoad.emit();
  }

  getData() {
      this.commentService.getCommentsByPhotoId(this.photo.id).subscribe((data: {comments}) => {
          this.comments = data.comments;
          this.onLoad.emit();
      }, () => {
        this.presentLoadErrorAlert();
      });
  }
    async presentLoadErrorAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Comments were not loaded. Try Again',
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
