import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { Material2Module } from '../../common/core/modules/material2.module';

import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { TextareaComponent } from './textarea/textarea.component';
import { PostsComponent } from './posts/posts.component';


@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    Material2Module,
  ],
  declarations: [
    ProfileComponent,
    UserComponent,
    TextareaComponent,
    PostsComponent,
  ]
})
export class ProfileModule { }
