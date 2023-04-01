import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesEnum } from '../../models/enums/roles.enum';
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
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  public roles: typeof RolesEnum = RolesEnum;

  public selectedRole: number = 0;

  ngOnInit() {
  }

  public canLogin(): boolean {
    return isValidEmail(this.loginPayload.email) && isValidPassword(this.loginPayload.password);
  }

  public async login(): Promise<void> {
    if (!this.canLogin()) {return;}


    const canLogin = await this.userService.login(this.loginPayload);

    const table = localStorage.getItem('loggedUser');

    const user: UserProxy = table ? JSON.parse(table) : {};

    if (canLogin) {
      if (user.role === 'company')
        await this.router.navigateByUrl('/home');

      if (user.role === 'user')
        await this.router.navigateByUrl('/learn')

      else
        await this.router.navigateByUrl('/admin')
    } else {
      return void await this.helper.showToast('Usuário ou senha incorreta!');
    }
  }

  public canRegister(): boolean {
    const isCompany = this.registerPayload.role === 'company';
    const isUser = this.registerPayload.role === 'user';

    return isValidEmail(this.registerPayload.email) && isValidEmail(this.registerPayload.confirmEmail)
      && this.registerPayload.email === this.registerPayload.confirmEmail
      && isValidPassword(this.registerPayload.password) && isValidPassword(this.registerPayload.confirmPassword)
      && this.registerPayload.password === this.registerPayload.confirmPassword
      && this.registerPayload.name.length > 3
      && isUser || (isCompany && this.registerPayload.cnpj?.length === 18)
  }

  public isCompany(): boolean {
    if (this.registerPayload.role === 'company')
      return this.registerPayload.cnpj?.length === 18;

    else return true;
  }

  public async register(): Promise<void> {
    if(!this.canRegister()) return;

    // this.userService.create(this.registerPayload);
    //
    // await this.router.navigate(['/home']);
    await this.helper.showToast('Bem vindo(a) ao Be Green!');
  }

  public applyMask(cnpj: any): void {
    this.registerPayload.cnpj = cnpj.replace(/\D/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }

}
