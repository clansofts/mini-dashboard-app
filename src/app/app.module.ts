import { NgModule } from '@angular/core';

import { AppProviderModule } from './app-provider.module';
import { AppRoutingModule } from './app-routing.module';
import { Material2Module } from './common/core/modules/material2.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { AppComponent } from './app.component';
import { OnSignoutComponent } from './common/shared/components/on-signout/on-signout.component';

import { FirebaseAuthService } from './common/core/services/firebase-auth.service';
import { FirebaseDbService } from './common/core/services/firebase-db.service';
import { SharedService } from './common/core/services/shared.service';


@NgModule({
  declarations: [
    AppComponent,
    OnSignoutComponent
  ],
  entryComponents: [
    OnSignoutComponent
  ],
  imports: [
    AppProviderModule,
    AppRoutingModule,
    Material2Module,
    SnotifyModule
  ],
  providers: [
    FirebaseAuthService,
    FirebaseDbService,
    SharedService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
