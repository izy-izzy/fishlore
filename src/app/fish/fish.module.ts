import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FishRoutingModule } from './fish-routing.module';
import { FishDetailComponent } from './components/fish-detail/fish-detail.component';
import { FishComponent } from './components/fish/fish.component';
import { FishlistComponent } from './components/fishlist/fishlist.component';
import { MatProgressSpinnerModule, MatExpansionModule, MatButtonModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    FishDetailComponent,
    FishComponent,
    FishlistComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    FishRoutingModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatButtonModule,
    FlexLayoutModule
  ]
})
export class FishModule { }
