import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RegistrationRoutingModule } from './registration-routing.module';
import { Material2Module } from '../../common/core/modules/material2.module';

import { RegistrationComponent } from './registration.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    Material2Module
  ],
  declarations: [
    RegistrationComponent
  ]
})
export class RegistrationModule { }
