import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectPointsPageRoutingModule } from './collect-points-routing.module';

import { CollectPointsPage } from './collect-points.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectPointsPageRoutingModule
  ],
  declarations: [CollectPointsPage]
})
export class CollectPointsPageModule {}
