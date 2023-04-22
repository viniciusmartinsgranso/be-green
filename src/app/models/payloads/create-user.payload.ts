import { BaseCrudProxy } from '../proxies/base.crud.proxy';

export interface CreateUserPayload extends BaseCrudProxy {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface RegisterPayload extends CreateUserPayload {
  confirmEmail: string;
  confirmPassword: string;
  address: string;
  cnpj?: string;
  cpf?: string;
  phone?: string;
  cep?: number;
}
