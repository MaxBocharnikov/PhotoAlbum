import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllphotosPage } from './allphotos.page';
import {PhotoSortPipe} from '../../shared/pipes/photo-sort.pipe';
import {PhotoComponent} from '../../shared/components/photo/photo.component';
import {CommentsComponent} from '../../shared/components/comments/comments.component';

const routes: Routes = [
  {
    path: '',
    component: AllphotosPage,
      children: [
          {path: ':id/comments', component: CommentsComponent}
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllphotosPage, PhotoSortPipe,  PhotoComponent, CommentsComponent]
})
export class AllphotosPageModule {}
