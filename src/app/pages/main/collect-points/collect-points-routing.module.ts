import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectPointsPage } from './collect-points.page';

const routes: Routes = [
  {
    path: '',
    component: CollectPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectPointsPageRoutingModule {}
