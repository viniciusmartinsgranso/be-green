import { Injectable } from '@angular/core';
import { MaterialsEnum } from '../models/enums/materials.enum';
import { RecycleProxy } from '../models/proxies/recycle.proxy';

@Injectable({
  providedIn: 'root',
})
export class RecycleService {

  constructor() { }

  public get(): RecycleProxy[] {
    const recycle = localStorage.getItem('recycles');
    return recycle ? JSON.parse(recycle) : false;
  }

  public create(recycle: RecycleProxy): void {
    const table = localStorage.getItem('recycles');
    const storageRecycles: RecycleProxy[] = table ? JSON.parse(table) : [];

    storageRecycles[storageRecycles.length - 1] === undefined ? recycle.id = 0 : recycle.id = storageRecycles[storageRecycles.length - 1].id + 1;

    if (recycle.weight) {
      switch (recycle.material) {
        case MaterialsEnum.CARDBOARD:
          recycle.user.points = recycle.user.points + (recycle.weight * 1000);
          break;

        case MaterialsEnum.GLASS:
          recycle.user.points = recycle.user.points + (recycle.weight * 2000);
          break;
      }
    }
    storageRecycles.push(recycle);
    localStorage.setItem('recycles', JSON.stringify(storageRecycles));
  }

  public delete(recycle: number): void {
    const table = localStorage.getItem('recycles');
    const storage: RecycleProxy[] = table ? JSON.parse(table) : [];

    const newList = storage.filter((recycleStorage) => {
      if (recycleStorage.id !== recycle) {
        return recycleStorage;
      } else return false;
    });

    storage.push(...newList);
    localStorage.setItem('recycles', JSON.stringify(newList));
  }
}
