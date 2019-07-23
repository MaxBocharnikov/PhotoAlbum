import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { CommentsComponent } from './comments/comments.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {SortComponent} from './sort/sort.component';
import {PhotoSortPipe} from '../pipes/photo-sort.pipe';
import { Routes, RouterModule } from '@angular/router';
import {FormGroup, FormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, FormsModule,  IonicModule, RouterModule],
    declarations: [PhotoComponent, CommentsComponent, SortComponent, PhotoSortPipe ],
    exports: [PhotoComponent, CommentsComponent, SortComponent, PhotoSortPipe, RouterModule]
})

export class SharedModule {}
