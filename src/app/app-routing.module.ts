import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', 
    redirectTo: '/info', 
    pathMatch: 'full' },
  { path: 'info', 
    loadChildren: () => import('./global/global.module')
      .then(mod => mod.GlobalModule) },
  { path: 'fish',
    loadChildren: () => import('./fish/fish.module')
      .then(mod => mod.FishModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
