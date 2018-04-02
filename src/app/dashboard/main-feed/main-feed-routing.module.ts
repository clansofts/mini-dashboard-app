import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainFeedComponent } from './main-feed.component';

const routes: Routes = [
  { path: '', component: MainFeedComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainFeedRoutingModule { }
