import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MyphotosPage } from './myphotos.page';
import {SharedModule} from '../../shared/components/shared.module';
import {PhotouploadPage} from '../photoupload/photoupload.page';

const routes: Routes = [
  {
    path: '',
    component: MyphotosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
      ReactiveFormsModule,
    IonicModule,
      SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyphotosPage, PhotouploadPage],
    entryComponents: [PhotouploadPage]
})
export class MyphotosPageModule {}
