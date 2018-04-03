import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardGuard } from './dashboard/dashboard.guard';
import { HomePageGuard } from './home-page/home-page.guard';


const routes: Routes = [
  { path: '', loadChildren: './home-page/home-page.module#HomePageModule', canActivate: [ HomePageGuard ] },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [ DashboardGuard ] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
