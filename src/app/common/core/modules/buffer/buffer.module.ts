import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BufferRoutingModule } from './buffer-routing.module';
import { Material2Module } from '../material2.module';

import { BufferComponent } from './buffer.component';


@NgModule({
  imports: [
    CommonModule,
    BufferRoutingModule,
    Material2Module
  ],
  declarations: [
    BufferComponent
  ]
})
export class BufferModule { }
