import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CollectPointProxy } from '../../../models/proxies/collect-point.proxy';
import { CollectService } from '../../../services/collect.service';

@Component({
  selector: 'app-show-collect-points',
  templateUrl: './show-collect-points.component.html',
  styleUrls: ['./show-collect-points.component.scss'],
})
export class ShowCollectPointsComponent  implements OnInit {

  constructor(
    public readonly modalController: ModalController,
    private readonly collectService: CollectService,
  ) { }

  public points: CollectPointProxy[] = [];

  public ngOnInit() {
    this.points = this.collectService.get();
  }

}
