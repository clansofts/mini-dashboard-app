import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './main-feed/main-feed.module#MainFeedModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
  { path: 'uploads', loadChildren: './uploads/uploads.module#UploadsModule' },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
