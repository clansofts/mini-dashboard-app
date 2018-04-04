import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MainFeedRoutingModule } from './main-feed-routing.module';
import { Material2Module } from '../../common/core/modules/material2.module';

import { MainFeedComponent } from './main-feed.component';
import { PostsComponent } from './posts/posts.component';
import { TextareaComponent } from './textarea/textarea.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainFeedRoutingModule,
    Material2Module,
  ],
  declarations: [
    MainFeedComponent,
    PostsComponent,
    TextareaComponent,
  ],
})
export class MainFeedModule { }
