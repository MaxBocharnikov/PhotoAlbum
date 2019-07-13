import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllphotosPage } from './allphotos.page';
import {SharedModule} from '../../shared/components/shared.module';
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
      SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AllphotosPage]
})
export class AllphotosPageModule {}
