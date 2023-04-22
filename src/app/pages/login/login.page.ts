import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPayload } from '../../models/payloads/login.payload';
import { RegisterPayload } from '../../models/payloads/create-user.payload';
import { UserProxy } from '../../models/proxies/user.proxy';
import { HelperService } from '../../services/helper.service';
import { UserService } from '../../services/user.service';
import { CustomValidators } from '../../utils/validators';
import isValidEmail = CustomValidators.isValidEmail;
import isValidPassword = CustomValidators.isValidPassword;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly helper: HelperService,
  ) { }

  public isLogin: boolean = false;

  public isRegister: boolean = false;

  public loginPayload: LoginPayload = {
    email: '',
    password: '',
  };

  public registerPayload: RegisterPayload = {
    id: 0,
    email: '',
    confirmEmail: '',
    name: '',
    role: '',
    password: '',
    confirmPassword: '',
    address: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  public selectedRole: number = 0;

  ngOnInit() {
  }

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

  public async login(): Promise<void> {
    if (!this.canLogin()) return;

    const canLogin = await this.userService.login(this.loginPayload);

    const table = localStorage.getItem('loggedUser');

    const user: UserProxy = table ? JSON.parse(table) : {};

    if (canLogin) {
      switch (user.role) {
        case ('company'):
          await this.router.navigateByUrl('/home');
          break;

        case ('user'):
          await this.router.navigateByUrl('/learn');
          break;

        case ('admin'):
          await this.router.navigateByUrl('/home');
          break;
      }
    } else {
      await this.helper.showToast('Usuário ou senha incorreta!');
    }
  }

  public canRegister(): boolean {
    const isCompany = this.registerPayload.role === 'company';
    const isUser = this.registerPayload.role === 'user';

    return isValidEmail(this.registerPayload.email) && isValidEmail(this.registerPayload.confirmEmail)
      && this.registerPayload.email === this.registerPayload.confirmEmail
      && this.registerPayload.password.length > 6 && this.registerPayload.confirmPassword.length > 6
      && this.registerPayload.password === this.registerPayload.confirmPassword
      && this.registerPayload.address.length > 5
      && this.registerPayload.name.length > 3
      && isUser || (isCompany && this.registerPayload.cnpj?.length === 18)
      && isCompany || (isUser && this.registerPayload.cpf?.length === 14)
      && isCompany || (isUser && this.registerPayload.phone?.length === 15);
  }

  public async register(): Promise<void> {
    if (!this.canRegister()) return;

    if (!this.userService.create(this.registerPayload))
      return void await this.helper.showToast('Usuário ou senha incorretos, tente novamente.');

    const user = this.userService.get()
    switch (user.role) {
      case ('user'):
        await this.router.navigateByUrl('/learn');
        break;

      case('company'):
        await this.router.navigateByUrl('/company');
        break;

      default:
        await this.router.navigateByUrl('/learn');
    }

    await this.helper.showToast('Bem vindo(a) ao Be Green!');
  }

}
