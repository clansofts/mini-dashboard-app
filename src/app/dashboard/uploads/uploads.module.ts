import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadsRoutingModule } from './uploads-routing.module';
import { Material2Module } from '../../common/core/modules/material2.module';

import { UploadsComponent } from './uploads.component';


@NgModule({
  imports: [
    CommonModule,
    UploadsRoutingModule,
    Material2Module,
  ],
  declarations: [
    UploadsComponent
  ]
})
export class UploadsModule { }
