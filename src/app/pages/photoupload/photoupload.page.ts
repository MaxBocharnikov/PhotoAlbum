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
  withParams = false;
  buttonText = 'Add Photo';
  @Input('id') id = '';
  @Input('title') title = '';
  @Input('description') description;
  constructor(private modalController: ModalController, private userService: UserService, private photoService: PhotosService, private alertController: AlertController) {}

  ngOnInit() {
    this.form = new FormGroup({
        file: new FormControl('', [Validators.required, this.checkFile]),
        title: new FormControl(`${this.id}`, [Validators.required, this.checkForLength]),
        description: new FormControl(`${this.title}`)
    });
    if (this.id) {
        this.withParams = true;
        this.buttonText = 'Edit Photo';
    }
  }
  dismissModal() {
   this.modalController.dismiss();
  }

  onSubmit() {
    if (!this.withParams) {
        this.addPhoto();
    } else {
       this.editPhoto();
    }
  }

  addPhoto() {
      const formValue = this.form.value;
      this.photoService.getAllPhotos().subscribe((resp: [Photo]) => {
          const data: Photo = {
              id: resp.length + 1,
              authorId: this.userService.getUser().id,
              authorName: this.userService.getUser().name,
              title: formValue.title,
              img: 'https://rockandresole.com/wp-content/uploads/2017/04/58832_300x300.jpg',
              text: formValue.description,
              date: new Date().toJSON(),
              updateDate: new Date().toJSON(),
              views: 0,
              likes: 0,
              rating: 0,
              comments: []
          };
          this.photoService.addUserPhoto(data).subscribe((added: Photo) => {
                  this.modalController.dismiss(data);
              },
              () => {
                  this.presentAlert();
              }
          );
      }); // Временное решение для получения уникального ID; Удалить получения списка фоток после добавления БЭКА
  }

    editPhoto() {
      const formValue = this.form.value;
      alert('hey');
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
    this.selectFile = event.target.files[0];
    console.log(this.selectFile);
  }

}
