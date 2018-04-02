import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { Material2Module } from '../../../common/core/modules/material2.module';

import { PrivateComponent } from './private.component';


@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    Material2Module
  ],
  declarations: [
    PrivateComponent
  ]
})
export class PrivateModule { }
