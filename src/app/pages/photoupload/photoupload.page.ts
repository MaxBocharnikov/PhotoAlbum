import {Component, Input, OnInit} from '@angular/core';
import {AlertController, ModalController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {PhotosService} from '../../shared/services/photos.service';
import {Photo} from '../../shared/interfaces/photo';

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.page.html',
  styleUrls: ['./photoupload.page.scss'],
})
export class PhotouploadPage implements OnInit {
  form: FormGroup;
  selectFile: File;
  buttonText: string;
  @Input('photo') photo: Photo = null;
  constructor(private modalController: ModalController, private userService: UserService, private photoService: PhotosService, private alertController: AlertController) {}

  ngOnInit() {
      if (!this.photo) {
          this.form = new FormGroup({
              file: new FormControl('', [Validators.required, this.checkFile]),
              title: new FormControl('', [Validators.required, this.checkForLength]),
              description: new FormControl('')
          });
          this.buttonText = 'Add Photo';
      } else {
          this.form = new FormGroup({
              title: new FormControl(this.photo.title, [Validators.required, this.checkForLength]),
              description: new FormControl(this.photo.description)
          });
          this.buttonText = 'Edit Photo';
      }
  }
  dismissModal() {
   this.modalController.dismiss();
  }

  onSubmit() {
    if (!this.photo) {
        this.addPhoto();
    } else {
       this.editPhoto();
    }
  }

  addPhoto() {
      const formValue = this.form.value;
      /*const data: Photo = {
          file: formValue.file,
          title: formValue.title,
          description: formValue.description
      };*/

      this.photoService.addUserPhoto(formValue).subscribe((added: Photo) => {
              this.modalController.dismiss(formValue);
          },
          () => {
              this.presentAlert();
          }
      );
  }

    editPhoto() {
      const formValue = this.form.value;
      this.photo.title = formValue.title;
      this.photo.description = formValue.description;
      this.photo.uploadDate = new Date().toJSON();
      this.photoService.editUserPhoto(this.photo).subscribe((added: Photo) => {
              this.modalController.dismiss(this.photo);
              },
          () => {
              this.presentAlert();
          }
      );
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Error',
            message: `The photo wasn't uploaded. Please repeat your attempt`,
            buttons: ['OK']
        });

        await alert.present();
    }

  checkForLength(control: FormControl) {
    if (control.value.length > 50) {
      return {
        lengthError: true
      };
    }
  }

  checkFile(control: FormControl) {
    const TYPES = ['jpg', 'JPEG', 'png', 'svg', 'gif'];
    const file = control.value;
    if (!file.length) {
      return;
    }
    const fileType = file.split('.').pop();
    if (!TYPES.some((type) => type === fileType)) {
      return {
        typeError: true
      };
    }
  }

  onFileChange(event) {
    let file  = event.target.files[0];
    this.form.controls['file'].setValue(file ? file.name : '');
  }

}
