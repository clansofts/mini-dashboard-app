import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from '../auth/auth.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
