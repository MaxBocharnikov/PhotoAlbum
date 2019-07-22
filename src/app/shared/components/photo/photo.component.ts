import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Photo} from '../../interfaces/photo';
import {ActionSheetController, AlertController, ModalController} from '@ionic/angular';
import {PhotosService} from '../../services/photos.service';
import {PhotouploadPage} from '../../../pages/photoupload/photoupload.page';
import {commentsTrigger} from '../../animations/comments.animation';
import {CommentsService} from "../../services/comments.service";
import {Comment} from "../../interfaces/comment";
import {CommentsComponent} from "../comments/comments.component";

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
  @Output() onCommentUpload = new EventEmitter<boolean>();
  @Output() onCommentDelete = new EventEmitter<boolean>();
  serverUrl = 'http://localhost:3000/';
  isCommentsShow = false;
  commentUploadText = '';
  commentId = null;
  constructor(private actionSheetController: ActionSheetController, private photoService: PhotosService, private commentService: CommentsService,  private alertController: AlertController, private modalController: ModalController) { }

  @ViewChild(CommentsComponent, {static: false})
  private commentComponent: CommentsComponent;

  ngOnInit() {
  }


  getStars(rating: number): {} {
      const STARS_AMOUNT = 5;
      return {
          star: new Array(rating),
          starOut: new Array(STARS_AMOUNT - rating)
      };
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

  toggleComments(event) {
      if (!+event.target.attributes.checked.value) {
          event.target.textContent = `Hide Comments (${this.photo.comments})`;
          event.target.attributes.checked.value = 1;
          this.isCommentsShow = true;

      } else {
          event.target.textContent = `Show Comments (${this.photo.comments})`;
          event.target.attributes.checked.value = 0;
          this.isCommentsShow = false;
        }
    }

    editCommentEvent(event: Comment) {
      this.commentId = event.id;
      this.commentUploadText = event.text;
    }

    addComment() {
        console.log('from add');
        this.commentService.addComment(this.photo.id, this.commentUploadText).subscribe((res) => {
            this.onCommentUpload.emit();
        });
    }

    editComment() {
        console.log('from edit');
        this.commentService.editComment(this.commentId, this.commentUploadText).subscribe((res) => {
            this.onCommentUpload.emit();
        });
        this.commentId = null;
    }

}
