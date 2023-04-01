import { BaseCrudProxy } from '../proxies/base.crud.proxy';

export interface CreateUserPayload extends BaseCrudProxy {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface RegisterPayload extends CreateUserPayload {
  confirmEmail: string;
  cnpj?: string;
  confirmPassword: string;
}
