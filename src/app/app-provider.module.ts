import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { Material2Module } from './common/core/modules/material2.module';
import 'hammerjs';

import { OnSignoutComponent } from './common/shared/components/on-signout/on-signout.component';

import { FirebaseAuthService } from './common/core/services/firebase-auth.service';
import { FirebaseDbService } from './common/core/services/firebase-db.service';
import { SharedService } from './common/core/services/shared.service';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { HomePageGuard } from './home-page/home-page.guard';

import { environment } from '../environments/environment';


@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    Material2Module
  ],
  declarations: [
    OnSignoutComponent
  ],
  entryComponents: [
    OnSignoutComponent
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SnotifyModule,
    Material2Module,
  ],
  providers: [
    FirebaseAuthService,
    FirebaseDbService,
    SharedService,
    DashboardGuard,
    HomePageGuard,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
})
export class AppProviderModule { }
