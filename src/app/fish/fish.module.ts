import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FishRoutingModule } from './fish-routing.module';
import { FishDetailComponent } from './components/fish-detail/fish-detail.component';
import { FishlistComponent } from './components/fishlist/fishlist.component';
import { MatProgressSpinnerModule, MatExpansionModule, MatButtonModule, MatButtonToggleModule} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FishDetailComponent,
    FishlistComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    FishRoutingModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatButtonModule,
    FlexLayoutModule,
    MatButtonToggleModule
  ]
})
export class FishModule { }
