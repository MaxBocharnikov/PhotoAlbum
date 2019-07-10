import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllphotosPage } from './allphotos.page';
import {PhotoSortPipe} from '../../shared/pipes/photo-sort.pipe';
import {ComponentsModule} from '../../shared/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: AllphotosPage
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
  declarations: [AllphotosPage, PhotoSortPipe, /*PhotoComponent, CommentsComponent*/]
})
export class AllphotosPageModule {}
