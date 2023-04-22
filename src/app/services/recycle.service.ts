import { Injectable } from '@angular/core';
import { RecycleProxy } from '../models/proxies/recycle.proxy';

@Injectable({
  providedIn: 'root'
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

    recycle.id = recycle.id === 0 ? 1 : storageRecycles[storageRecycles.length - 1].id + 1;

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
