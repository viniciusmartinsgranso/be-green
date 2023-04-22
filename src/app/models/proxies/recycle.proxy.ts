import { MaterialsEnum } from '../enums/materials.enum';
import { BaseCrudProxy } from './base.crud.proxy';
import { UserProxy } from './user.proxy';

export interface RecycleProxy extends BaseCrudProxy {
  material: MaterialsEnum;
  weight: number | null;
  imageUrl: string[];
  user: UserProxy;
}
