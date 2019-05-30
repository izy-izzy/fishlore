import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatMenuModule,
  MatDividerModule,
  MatListModule,
  MatPaginatorModule,
  MatCardModule,
  MatExpansionModule, MatTooltipModule, MatProgressSpinnerModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FishComponent } from './components/fish/fish.component';
import { FormsModule } from '@angular/forms';
import { FishlistComponent } from './components/fishlist/fishlist.component';
import { InfoComponent } from './components/info/info.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FishIconComponent } from './components/fishicon/fishicon.component';

@NgModule({
  declarations: [
    AppComponent,
    FishComponent,
    FishlistComponent,
    InfoComponent,
    NavigationComponent,
    PaginationComponent,
    FishIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    FlexLayoutModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
