import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishlistComponent } from './components/fishlist/fishlist.component';
import { FishDetailComponent } from './components/fish-detail/fish-detail.component';

export interface IFishListRouteParams {
  currentPage? : string,
  itemsPerPage? : string,
  openedFishSpecCode? : string,
  query?: string
}

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: FishlistComponent },
  { path: 'fishdetail/:specCode', component: FishDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FishRoutingModule { }
