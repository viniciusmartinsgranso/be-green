import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-collect-user-point',
  templateUrl: './collect-user-point.component.html',
  styleUrls: ['./collect-user-point.component.scss'],
})
export class CollectUserPointComponent  implements OnInit {

  constructor(
    private readonly modalController: ModalController,
  ) { }

  ngOnInit() {}

  public async exitModal(): Promise<void> {
    await this.modalController.dismiss();
  }

}
