import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialsEnum, translatedMaterials } from '../../../models/enums/materials.enum';
import { RecycleProxy } from '../../../models/proxies/recycle.proxy';
import { UserProxy } from '../../../models/proxies/user.proxy';
import { HelperService } from '../../../services/helper.service';
import { RecycleService } from '../../../services/recycle.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.page.html',
  styleUrls: ['./verify-user.page.scss'],
})
export class VerifyUserPage implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly helper: HelperService,
    private readonly userService: UserService,
    private readonly recycleService: RecycleService,
  ) {}

  public user!: UserProxy;

  public postUser: UserProxy = {
    id: 0,
    name: '',
    role: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '',
    phone: undefined,
    cpf: '',
    cnpj: '',
  };

  public userVerified: UserProxy = {
    id: 0,
    name: '',
    role: '',
    email: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    password: '',
    phone: undefined,
    cpf: '',
    cnpj: '',
  };

  public usersList: UserProxy[] = [];

  public recycle: RecycleProxy = {
    material: 0,
    imageUrl: [],
    id: 0,
    updatedAt: new Date(),
    createdAt: new Date(),
    weight: null,
    user: this.postUser,
  };

  public translatedList: Record<MaterialsEnum, string> = translatedMaterials;

  public materialsEnum: typeof MaterialsEnum = MaterialsEnum;

  public isUserVerified: boolean = false;

  public async ngOnInit(): Promise<void> {
    this.user = this.userService.get();

    if (this.user.role === 'user') {
      await this.router.navigateByUrl('/learn');
      return void await this.helper.showToast('Oops... Você não tem permissão para acessar essa página');
    }
  }

  public canVerify(): boolean {
    const haveCpf = !!this.userVerified.cpf;
    const havePhone = !!this.userVerified.phone;
    return this.userVerified.name.length >= 4 && haveCpf && havePhone;

  }

  public async verifyUsers(): Promise<boolean> {
    this.usersList = this.userService.getUsers();
    const newUser = this.usersList.find(user => {
      return user.name === this.userVerified.name
        && user.cpf === this.userVerified.cpf && user.phone === this.userVerified.phone;
    });

    if (newUser === undefined) {
      await this.helper.showToast('Usuário não encontrado.');
      return false;
    } else {
      await this.helper.showToast('Usuário encontrado com sucesso!');
      this.postUser = newUser;
      this.isUserVerified = true;
      return false;
    }
  }

  public getFirst(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.recycle.imageUrl[0] = reader.result.toString();
    };
    reader.onerror = async error => {
      await this.helper.showToast(String(error));
    };
  }

  public getSecond(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result)
        this.recycle.imageUrl[1] = reader.result.toString();
    };
    reader.onerror = async error => {
      await this.helper.showToast(String(error));
    };
  }

  public async onSubmit(): Promise<void> {
    this.recycle.user = this.postUser;
    this.recycleService.create(this.recycle);
    await this.helper.showToast('Cadastrado com sucesso!');
  }

}
