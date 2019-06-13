import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FishlistComponent, IFishListSearchType } from './components/fishlist/fishlist.component';
import { FishDetailComponent } from './components/fish-detail/fish-detail.component';
import { CustomFishListComponent } from './components/custom-fish-list/custom-fish-list.component';

export interface IFishListRouteParams {
  currentPage? : string,
  itemsPerPage? : string,
  openedFishSpecCode? : string,
  query?: string,
  searchType?: IFishListSearchType
}

const routes: Routes = [
  { path: '', redirectTo: ''},
  { path: 'list', component: FishlistComponent },
  { path: 'savedList', component: CustomFishListComponent },
  { path: 'fishdetail/:specCode', component: FishDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FishRoutingModule { }
