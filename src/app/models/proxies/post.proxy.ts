import { SafeResourceUrl } from '@angular/platform-browser';
import { FunctionalitiesEnum } from '../enums/functionalities.enum';
import { BaseCrudProxy } from './base.crud.proxy';

export interface PostProxy extends BaseCrudProxy {
  title: string;
  videoUrl: string;
  type: FunctionalitiesEnum;
  urlSafe?: SafeResourceUrl;
}
