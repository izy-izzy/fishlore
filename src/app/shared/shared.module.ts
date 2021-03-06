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
  MatExpansionModule, MatTooltipModule, MatProgressSpinnerModule, MatToolbarModule, MatIconModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, MatDialogModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ModalMessageDialogComponent } from './components/modal-message/modal-message.component';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    NavigationComponent,
    PaginationComponent,
    FishIconComponent,
    HeaderComponent,
    SearchbarComponent,
    ModalMessageDialogComponent,
    TruncatePipe
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
    FlexLayoutModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  exports: [
    NavigationComponent,
    PaginationComponent,
    FishIconComponent,
    HeaderComponent,
    SearchbarComponent,
    ModalMessageDialogComponent,
    TruncatePipe
  ],
  entryComponents: [ModalMessageDialogComponent]
})
export class SharedModule { }
