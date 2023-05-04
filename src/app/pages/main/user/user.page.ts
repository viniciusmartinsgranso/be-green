import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExitAppComponent } from '../../../components/modals/exit-app/exit-app.component';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly modalController: ModalController,
  ) {
    this.user = this.userService.get();
  }

  public user!: UserProxy;

  public totalPercentage: number = 100;

  public firstMeta: number = 20;

  public firstWidth: number = 0;

  public secondMeta: number = 40;

  public secondWidth: number = 0;

  public thirdMeta: number = 60;

  public thirdWidth: number = 0;

  public ngOnInit(): void {
    const totalPercentage = 100;
    this.firstWidth = (this.totalPercentage * this.user.points)/this.firstMeta;

    this.secondWidth = (this.totalPercentage * this.user.points)/this.secondMeta;

    this.thirdWidth = (this.totalPercentage * this.user.points)/this.thirdMeta;
  }

  public async openExitModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ExitAppComponent,
      cssClass: 'local-backdrop',
    });

    await modal.present();
  }

}
