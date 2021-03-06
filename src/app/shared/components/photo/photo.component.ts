import {
    ApplicationRef, Component, EventEmitter, Input, OnInit, Output,
    ViewChild
} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {PhotosService} from '../../services/photos.service';
import {PhotouploadPage} from '../../../pages/photoupload/photoupload.page';
import {commentsTrigger} from '../../animations/comments.animation';
import {CommentsService} from '../../services/comments.service';
import {Comment} from '../../interfaces/comment';
import {CommentsComponent} from '../comments/comments.component';
import {AuthService} from '../../services/auth.service';
import {LikesService} from '../../services/likes.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
    animations: [commentsTrigger],
})
export class PhotoComponent implements OnInit {
  @Input() photo: Photo;
  @Input() profileMod = false;
  @Output() onDelete = new EventEmitter<number>()
  serverUrl = 'http://localhost:3000/';
  commentsButtonText: string;
  isCommentsShow = false;
  commentUploadText = '';
  commentId = null;
  liked = 0;
  constructor(
      private actionSheetController: ActionSheetController,
      private photoService: PhotosService,
      private commentService: CommentsService,
      private alertController: AlertController,
      private modalController: ModalController,
      private appRef: ApplicationRef,
      private authSevice: AuthService,
      private likesService: LikesService) { }

  @ViewChild('commentInput') commentInput;
  @ViewChild(CommentsComponent)
  private commentComponent: CommentsComponent;

  ngOnInit() {
     this.commentsButtonText = `Show Comments (${this.photo.comments})`;
     if (this.authSevice.isLogin && !this.profileMod) {
         this.likesService.isLiked(this.photo.id).subscribe((data: {isLike:number}) => {
             this.liked = data.isLike;
         })
     }
  }

  async showActions() {
      const actionSheet = await this.actionSheetController.create({
          header: 'Albums',
          buttons: [{
              text: 'Edit',
              icon: 'create',
              handler: () => {
                  this.editPhoto();
              }
          }, {
              text: 'Delete',
              role: 'destructive',
              icon: 'trash',
              handler: () => {
                  this.presentAlertConfirm();
              }
          }, {
              text: 'Cancel',
              role: 'cancel'
          }
          ]
      });
      await actionSheet.present();
  }

  deletePhoto(id: number) {
      this.photoService.deleteUserPhoto(id).subscribe(() => {
          this.onDelete.emit(id);
      }, () => {
          this.presentAlert();
      });
  }
  async presentAlert() {
      const alert = await this.alertController.create({
          header: 'Failed',
          message: 'Something went wrong. Please repeat your attempt',
          buttons: ['OK']
      });

      await alert.present();
  }
  async presentAlertConfirm() {
      const alert = await this.alertController.create({
          header: 'Deleting confirm!',
          message: 'Are you sure you wanna delete this photo?',
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel'
              }, {
              text: 'Okay',
                handler: () => {
                  this.deletePhoto(this.photo.id);
                 }
          }
         ]
     });
      await alert.present();
    }
    async editPhoto() {
      const modal = await this.modalController.create({
          component: PhotouploadPage,
          componentProps: {
              isNew: false,
              photo: this.photo
          }
      });
      modal.onDidDismiss()
          .then((data) => {
              const photo = data.data;
              if (typeof photo !== 'undefined') {
                  this.photo = photo;
              }
          });
      return await modal.present();
  }

  toggleComments() {
      this.isCommentsShow = !this.isCommentsShow;
      //this.setCommentsButtonText();
    }

    setCommentsButtonText() {
      this.isCommentsShow ? this.commentsButtonText = `Hide Comments (${this.photo.comments})` : this.commentsButtonText = `Show Comments (${this.photo.comments})`;
    }

    dicrementCommentCount() {
      this.photo.comments--;
      this.setCommentsButtonText();
    }

    incrementCommentCount() {
        this.photo.comments++;
    }

    addComment() {
        this.commentService.addComment(this.photo.id, this.commentUploadText).subscribe(() => {
            this.commentUploadText = '';
            if (this.isCommentsShow) {
                this.commentComponent.getData();
            }
            this.incrementCommentCount();
            this.setCommentsButtonText();
        }, () => {
            this.presentUploadErrorAlert();
        });
    }

    async presentUploadErrorAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: 'Comment was not upload. Try Again',
            buttons: ['OK']
        });

        await alert.present();
    }

    addLike() {
        this.likesService.addLike(this.photo.id).subscribe(() => {
            this.photo.likes++;
            this.liked = 1;
        })
    }

    removeLike() {
        this.likesService.removeLike(this.photo.id).subscribe(() => {
            this.photo.likes--;
            this.liked = 0;
        })
    }


    toggleLike() {
      if (!this.authSevice.isLogin || this.profileMod) {
          return;
      }
      if (this.liked) {
          this.removeLike();

      } else {
          this.addLike();
      }

    }
}
