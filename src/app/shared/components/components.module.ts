import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { CommentsComponent } from './comments/comments.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [CommonModule, IonicModule],
    declarations: [PhotoComponent, CommentsComponent],
    exports: [PhotoComponent, CommentsComponent]
})

export class ComponentsModule {}
