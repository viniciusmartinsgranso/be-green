import { RolesEnum } from '../enums/roles.enum';
import { BaseCrudProxy } from './base.crud.proxy';

export interface UserProxy extends BaseCrudProxy {
  email: string;
  name: string;
  role: string;
  password: string;
}
