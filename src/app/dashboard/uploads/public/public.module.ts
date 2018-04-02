import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { Material2Module } from '../../../common/core/modules/material2.module';

import { PublicComponent } from './public.component';


@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    Material2Module
  ],
  declarations: [
    PublicComponent
  ]
})
export class PublicModule { }
