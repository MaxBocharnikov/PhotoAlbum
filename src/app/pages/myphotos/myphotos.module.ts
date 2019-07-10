import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { MyphotosPage } from './myphotos.page';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: MyphotosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyphotosPage, /*PhotoComponent, CommentsComponent*/]
})
export class MyphotosPageModule {}
