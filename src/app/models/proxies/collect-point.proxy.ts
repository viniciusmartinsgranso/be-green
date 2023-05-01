import { LocationInterface } from '../interfaces/location.interface';
import { BaseCrudProxy } from './base.crud.proxy';

export interface CollectPointProxy extends BaseCrudProxy {
  name: string;
  address: string;
  locale: LocationInterface;
}
