import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
      children: [
          {path: 'allphotos', loadChildren: '../allphotos/allphotos.module#AllphotosPageModule'},
          {path: 'myphotos', loadChildren: '../myphotos/myphotos.module#MyphotosPageModule'},
          {path: 'user', loadChildren: '../user/user.module#UserPageModule'}
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
