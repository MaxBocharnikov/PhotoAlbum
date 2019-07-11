import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.page.html',
  styleUrls: ['./photoupload.page.scss'],
})
export class PhotouploadPage implements OnInit {
  form: FormGroup;
  selectFile: File;
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.form = new FormGroup({
        file: new FormControl('', [Validators.required, this.checkFile]),
        title: new FormControl('', [Validators.required, this.checkForLength]),
        description: new FormControl('')
    });
  }
  dismissModal() {
   this.modalController.dismiss();
  }

  onSubmit() {
    const data = {

    }
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
