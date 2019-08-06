import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertController} from '@ionic/angular';
import {UserService} from '../../services/user.service';
import {Photo} from '../../interfaces/photo';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() photo: Photo;
  @Output() onEditClick = new EventEmitter<boolean>();
  @Output() onDeleteClick = new EventEmitter<number>();

  constructor(
      private userService: UserService,
      private alertController: AlertController,
      private authService: AuthService) { }

  ngOnInit() {}

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


}
