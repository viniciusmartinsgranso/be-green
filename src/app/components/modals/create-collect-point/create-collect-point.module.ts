import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateCollectPointComponent } from './create-collect-point.component';

@NgModule({
  declarations: [
    CreateCollectPointComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    CreateCollectPointComponent
  ]
})
export class CreateCollectPointModule { }
