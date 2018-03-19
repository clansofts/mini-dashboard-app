import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from './playground.component';

@NgModule({
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ],
  declarations: [
    PlaygroundComponent
  ]
})
export class PlaygroundModule { }
