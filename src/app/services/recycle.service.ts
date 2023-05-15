import { Injectable } from '@angular/core';
import { MaterialsEnum } from '../models/enums/materials.enum';
import { RecycleProxy } from '../models/proxies/recycle.proxy';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RecycleService {

  constructor(
    private readonly userService: UserService,
  ) { }

  public get(): RecycleProxy[] {
    const recycle = localStorage.getItem('recycles');
    return recycle ? JSON.parse(recycle) : false;
  }

  public create(recycle: RecycleProxy): void {
    const table = localStorage.getItem('recycles');
    const storageRecycles: RecycleProxy[] = table ? JSON.parse(table) : [];

    storageRecycles[storageRecycles.length - 1] === undefined ? recycle.id = 0 : recycle.id = storageRecycles[storageRecycles.length - 1].id + 1;

    const mat: number = Number(recycle.material);

    if (recycle.weight) {
      switch (mat) {
        case MaterialsEnum.ALUMINIUM:
          recycle.user.points = recycle.user.points + (recycle.weight * 3);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.COPPER:
          recycle.user.points = recycle.user.points + (recycle.weight * 2);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.IRON:
          recycle.user.points = recycle.user.points + (recycle.weight * 2);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.STEEL:
          recycle.user.points = recycle.user.points + (recycle.weight * 2);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.OTHER_METALS:
          recycle.user.points = recycle.user.points + recycle.weight;
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.OIL:
          recycle.user.points = recycle.user.points + (recycle.weight * 3);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.ORGANICS:
          recycle.user.points = recycle.user.points + recycle.weight;
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.PLASTIC:
          recycle.user.points = recycle.user.points + (recycle.weight * 2);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.PAPER:
          recycle.user.points = recycle.user.points + (recycle.weight * 2);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.CARDBOARD:
          recycle.user.points = recycle.user.points + recycle.weight ;
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;

        case MaterialsEnum.GLASS:
          recycle.user.points = recycle.user.points + (recycle.weight * 2);
          this.userService.updateUserPoints(recycle.user, recycle.user.points);
          break;
      }

    }

    storageRecycles.push(recycle);
    localStorage.setItem('recycles', JSON.stringify(storageRecycles));
  }

}
