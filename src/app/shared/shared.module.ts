import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../shared/components/navigation/navigation.component';
import { PaginationComponent } from '../shared/components/pagination/pagination.component';
import { FishIconComponent } from '../shared/components/fishicon/fishicon.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatPaginatorModule,
  MatCardModule,
  MatExpansionModule, MatTooltipModule, MatProgressSpinnerModule, MatToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavigationComponent,
    PaginationComponent,
    FishIconComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  exports: [
    NavigationComponent,
    PaginationComponent,
    FishIconComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
