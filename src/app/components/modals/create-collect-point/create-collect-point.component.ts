import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocationInterface } from '../../../models/interfaces/location.interface';
import { CollectPointProxy } from '../../../models/proxies/collect-point.proxy';
import { CollectService } from '../../../services/collect.service';
import { HelperService } from '../../../services/helper.service';

@Component({
  selector: 'app-create-collect-point',
  templateUrl: './create-collect-point.component.html',
  styleUrls: ['./create-collect-point.component.scss'],
})
export class CreateCollectPointComponent  implements OnInit {

  constructor(
    private readonly collectService: CollectService,
    private readonly helper: HelperService,
    public readonly modalController: ModalController,
  ) { }

  public point: CollectPointProxy = {
    id: 1,
    address: '',
    name: '',
    locale: {
      latitude: 0,
      longitude: 0,
    },
    updatedAt: new Date(),
    createdAt: new Date(),
  }

  ngOnInit() {}

  public async createPoint(): Promise<void> {
    this.collectService.create(this.point);

    await this.helper.showToast('Ponto de coleta criado com sucesso!');
    await this.modalController.dismiss();
    location.reload();
  }

}
