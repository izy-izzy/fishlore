import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FishlistComponent} from './components/fishlist/fishlist.component';
import {InfoComponent} from './components/info/info.component';

const routes: Routes = [
  { path: '', redirectTo: '/info', pathMatch: 'full' },
  { path: 'info', component: InfoComponent },
  { path: 'fishlist', component: FishlistComponent },
  { path: 'fishlist/:currentPage', component: FishlistComponent },
  { path: 'fishlist/:currentPage/:itemsPerPage', component: FishlistComponent },
  { path: 'fishlist/:currentPage/:itemsPerPage/:openedFishSpecCode', component: FishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
