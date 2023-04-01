import { BaseCrudProxy } from '../proxies/base.crud.proxy';

export interface UpdateUserPayload extends BaseCrudProxy {
  name: string;
  email: string;
  password: string;
}
