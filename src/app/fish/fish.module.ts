import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FishRoutingModule } from './fish-routing.module';
import { FishDetailComponent } from './components/fish-detail/fish-detail.component';
import { FishlistComponent } from './components/fishlist/fishlist.component';
import { MatProgressSpinnerModule, MatExpansionModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatProgressBarModule} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { CustomFishListComponent } from './components/custom-fish-list/custom-fish-list.component';
import { FishCardComponent } from './components/fish-card/fish-card.component';

@NgModule({
  declarations: [
    FishDetailComponent,
    FishlistComponent,
    CustomFishListComponent,
    FishCardComponent
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
    MatButtonToggleModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class FishModule { }
