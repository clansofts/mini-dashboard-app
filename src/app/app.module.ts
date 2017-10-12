import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './core/components/components.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { AppGuard } from './app-guard.service';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [
    AppGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
