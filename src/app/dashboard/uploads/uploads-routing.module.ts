import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadsComponent } from './uploads.component';

const routes: Routes = [
  { path: '', component: UploadsComponent, children: [
    { path: '', loadChildren: './public/public.module#PublicModule' },
    { path: 'u1', loadChildren: './public/public.module#PublicModule' },
    { path: 'u0', loadChildren: './private/private.module#PrivateModule' }
  ] },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadsRoutingModule { }
