import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {AuthGuardService} from '../../shared/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
      children: [
          {path: 'allphotos', loadChildren: '../allphotos/allphotos.module#AllphotosPageModule'},
          {path: 'myphotos', loadChildren: '../myphotos/myphotos.module#MyphotosPageModule', canActivate: [AuthGuardService]},
          {path: 'login', loadChildren: '../login/login.module#LoginPageModule'},
          {path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule',  canActivate: [AuthGuardService]},
      ]
  },
    {
      path: '',
      redirectTo: '/tabs/allphotos',
       pathMatch: 'full'
    }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
