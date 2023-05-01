import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CreateCollectPointModule } from '../../../components/modals/create-collect-point/create-collect-point.module';
import { ShowCollectPointsModule } from '../../../components/modals/show-collect-points/show-collect-points.module';

import { CollectPointsPageRoutingModule } from './collect-points-routing.module';

import { CollectPointsPage } from './collect-points.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectPointsPageRoutingModule,
    CreateCollectPointModule,
    ShowCollectPointsModule,
  ],
  declarations: [CollectPointsPage]
})
export class CollectPointsPageModule {}
