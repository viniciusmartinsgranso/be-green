import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-exit-app',
  templateUrl: './exit-app.component.html',
  styleUrls: ['./exit-app.component.scss'],
})
export class ExitAppComponent  implements OnInit {

  constructor(
    private readonly modalController: ModalController,
    private readonly userService: UserService,
  ) { }

  ngOnInit() {}

  public async exitApp(): Promise<void> {
    await this.modalController.dismiss();
    await this.userService.logoutUser();
  }

  public async continueApp(): Promise<void> {
    await this.modalController.dismiss();
  }

}
