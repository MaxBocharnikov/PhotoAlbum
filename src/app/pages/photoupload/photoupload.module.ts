import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PhotouploadPage } from './photoupload.page';

const routes: Routes = [
  {
    path: '',
    component: PhotouploadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    IonicModule,
      ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PhotouploadPage]
})
export class PhotouploadPageModule {}
