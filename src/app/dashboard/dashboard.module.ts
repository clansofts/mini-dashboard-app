import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { DashboardGuard } from './dashboard-guard.service';
import { DashboardResolver } from './dashboard-resolver.service';
import { AlbumComponent } from './album/album.component';
import { PostComponent } from './main-page/post/post.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    MainPageComponent,
    UserProfileComponent,
    AlbumComponent,
    PostComponent
  ],
  providers: [
    DashboardGuard,
    DashboardResolver
  ]
})
export class DashboardModule { }
