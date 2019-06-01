import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './components/info/info.component';

import { GlobalRoutingModule } from './global-routing.module';

@NgModule({
  declarations: [
    InfoComponent
  ],
  imports: [
    GlobalRoutingModule,
    CommonModule
  ]
})
export class GlobalModule { }
