import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { Material2Module } from '../../common/core/modules/material2.module';

import { LoginComponent } from './login.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    Material2Module
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
