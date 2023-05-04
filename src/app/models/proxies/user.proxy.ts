import { BaseCrudProxy } from './base.crud.proxy';

export interface UserProxy extends BaseCrudProxy {
  email: string;
  name: string;
  role: string;
  password: string;
  points: number;
  imageUrl: string;
  cpf?: string;
  cnpj?: string;
  phone?: string;
}
