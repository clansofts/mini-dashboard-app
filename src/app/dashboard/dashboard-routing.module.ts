import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AlbumComponent } from './album/album.component';

import { DashboardGuard } from './dashboard-guard.service';
import { DashboardResolver } from './dashboard-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    resolve: { data: DashboardResolver },
    children: [
      { path: '', component: MainPageComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'album', component: AlbumComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
