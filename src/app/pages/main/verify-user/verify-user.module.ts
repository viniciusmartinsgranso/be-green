import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialPipeModule } from '../../../pipes/material.pipe';

import { VerifyUserPageRoutingModule } from './verify-user-routing.module';

import { VerifyUserPage } from './verify-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyUserPageRoutingModule,
    MaterialPipeModule,
    NgxMaskModule,
  ],
  declarations: [VerifyUserPage]
})
export class VerifyUserPageModule {}
