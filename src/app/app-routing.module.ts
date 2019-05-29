import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FishlistComponent} from './components/fishlist/fishlist.component';
import {InfoComponent} from './components/info/info.component';

const routes: Routes = [
  { path: 'fishlist', component: FishlistComponent },
  { path: 'info', component: InfoComponent },
  { path: '', redirectTo: '/info', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
