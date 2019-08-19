import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { CommentsComponent } from './comments/comments.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {SortComponent} from './sort/sort.component';
import {PhotoSortPipe} from '../pipes/photo-sort.pipe';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {CommentComponent} from './comment/comment.component';
import {CommentsSortPipe} from '../pipes/comments-sort.pipe';

@NgModule({
    imports: [CommonModule, FormsModule,  IonicModule, RouterModule],
    declarations: [PhotoComponent, CommentsComponent, CommentComponent, SortComponent, PhotoSortPipe, CommentsSortPipe ],
    exports: [PhotoComponent, CommentsComponent, CommentComponent, SortComponent, PhotoSortPipe, RouterModule]
})

export class SharedModule {}
