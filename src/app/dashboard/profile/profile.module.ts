import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { Material2Module } from '../../common/core/modules/material2.module';

import { ProfileComponent } from './profile.component';
import { UserComponent } from './user/user.component';
import { TextareaComponent } from './textarea/textarea.component';
import { PostsComponent } from './posts/posts.component';

import { UserResolver } from './user/user.resolver';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRoutingModule,
    Material2Module,
  ],
  declarations: [
    ProfileComponent,
    UserComponent,
    TextareaComponent,
    PostsComponent,
  ],
  providers: [
    UserResolver
  ]
})
export class ProfileModule { }
