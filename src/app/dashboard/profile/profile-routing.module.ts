import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';

import { UserResolver } from './user/user.resolver';

const routes: Routes = [
  { path: '', component: ProfileComponent, resolve: [ UserResolver ] }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
