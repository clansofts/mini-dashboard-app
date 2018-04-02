import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import 'hammerjs';

import { environment } from '../environments/environment';

export const firebaseConfig = environment.firebaseConfig;


@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  declarations: [],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ]
})
export class AppProviderModule { }
