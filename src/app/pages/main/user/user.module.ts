import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CollectUserPointModule } from '../../../components/modals/collect-user-point/collect-user-point.module';
import { ExitAppModule } from '../../../components/modals/exit-app/exit-app.module';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPageRoutingModule,
    ExitAppModule,
    CollectUserPointModule,
  ],
  declarations: [UserPage]
})
export class UserPageModule {}
