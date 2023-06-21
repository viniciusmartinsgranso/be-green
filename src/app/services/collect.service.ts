import { Injectable } from '@angular/core';
import { CollectPointProxy } from '../models/proxies/collect-point.proxy';

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  constructor() { }

  public get(): CollectPointProxy[] {
    const collect = localStorage.getItem('collect');
    return collect ? JSON.parse(collect) : false;
  }

  public create(collectPoint: CollectPointProxy): void {
    const table = localStorage.getItem('collect');
    const storageCollect: CollectPointProxy[] = table ? JSON.parse(table) : [];

    storageCollect[storageCollect.length - 1] === undefined ? collectPoint.id = 0 : collectPoint.id = storageCollect[storageCollect.length - 1].id + 1;

    storageCollect.push(collectPoint);
    localStorage.setItem('collect', JSON.stringify(storageCollect));
  }

  public delete(collectPoint: number): void {
    const table = localStorage.getItem('collect');
    const storage: CollectPointProxy[] = table ? JSON.parse(table) : [];

    const newList = storage.filter((collectStorage) => {
      if (collectStorage.id !== collectPoint) {
        return collectStorage;
      } else return false;
    });

    storage.push(...newList);
    localStorage.setItem('collect', JSON.stringify(newList));
  }


}
